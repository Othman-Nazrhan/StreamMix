import { useState, useEffect } from 'react';
import { contentService } from '../services/contentService.js';

// Custom hook for daily random mix generation and caching
export const useDailyMix = () => {
  const [dailyMix, setDailyMix] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const STORAGE_KEY = 'streammix-daily-mix';
  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  const getCacheKey = () => {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  };

  const isCacheValid = (cachedData) => {
    if (!cachedData || !cachedData.timestamp) return false;
    const now = Date.now();
    return (now - cachedData.timestamp) < CACHE_DURATION;
  };

  const generateDailyMix = async () => {
    setLoading(true);
    setError(null);
    try {
      // Generate random mix once per day
      const mix = await contentService.fetchMixedContent(5);
      const cacheData = {
        mix,
        timestamp: Date.now(),
        dateKey: getCacheKey()
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(cacheData));
      setDailyMix(mix);
    } catch (err) {
      setError(err.message);
      console.error('Error generating daily mix:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadDailyMix = async () => {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        const cacheData = JSON.parse(cached);
        if (isCacheValid(cacheData) && cacheData.dateKey === getCacheKey()) {
          setDailyMix(cacheData.mix);
          return;
        }
      } catch (err) {
        console.error('Error parsing cached daily mix:', err);
      }
    }

    // Generate new mix if cache is invalid or doesn't exist
    await generateDailyMix();
  };

  useEffect(() => {
    loadDailyMix();
  }, []);

  return {
    dailyMix,
    loading,
    error,
    refresh: generateDailyMix
  };
};
