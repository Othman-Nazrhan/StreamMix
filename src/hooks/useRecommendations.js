import { useState, useEffect } from 'react';
import { contentService } from '../services/contentService.js';

// Custom hook for activity-based recommendations
export const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const STORAGE_KEY = 'streammix-activity-history';

  const getActivityHistory = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error parsing activity history:', error);
      return [];
    }
  };

  const saveActivity = (item, action = 'play') => {
    const history = getActivityHistory();
    const activityEntry = {
      ...item,
      action,
      timestamp: Date.now(),
      type: item.type || 'unknown'
    };

    // Keep only last 100 activities
    const updatedHistory = [activityEntry, ...history].slice(0, 100);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));

    // Generate new recommendations
    generateRecommendations(updatedHistory);
  };

  const generateRecommendations = async (history) => {
    if (history.length === 0) return;

    setLoading(true);
    try {
      // Analyze most common types and keywords
      const typeCounts = {};
      const keywordCounts = {};

      history.forEach(activity => {
        // Count content types
        typeCounts[activity.type] = (typeCounts[activity.type] || 0) + 1;

        // Extract keywords from titles, artists, etc.
        const text = `${activity.name || activity.title || ''} ${activity.artist_name || activity.artist || ''} ${activity.author || ''}`.toLowerCase();
        const words = text.split(/\s+/).filter(word => word.length > 2);

        words.forEach(word => {
          keywordCounts[word] = (keywordCounts[word] || 0) + 1;
        });
      });

      // Get most popular type
      const mostPopularType = Object.entries(typeCounts)
        .sort(([,a], [,b]) => b - a)[0]?.[0] || 'music';

      // Get top keywords
      const topKeywords = Object.entries(keywordCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([keyword]) => keyword);

      // Generate search query
      const searchQuery = topKeywords.join(' ');

      // Fetch recommendations based on popular type and keywords
      let recs = [];
      switch (mostPopularType) {
        case 'music':
          recs = await contentService.fetchMusic(searchQuery, 8);
          break;
        case 'videos':
          recs = await contentService.fetchVideos(searchQuery, 8);
          break;
        case 'podcasts':
          recs = await contentService.fetchPodcasts(searchQuery, 8);
          break;
        case 'radio':
          recs = await contentService.fetchRadioStations(searchQuery, 8);
          break;
        case 'images':
          recs = await contentService.fetchImages(searchQuery, 8);
          break;
        default:
          recs = await contentService.fetchMusic(searchQuery, 8);
      }

      setRecommendations(recs.map(item => ({ ...item, recommended: true })));
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRecommendations([]);
  };

  useEffect(() => {
    const history = getActivityHistory();
    if (history.length > 0) {
      generateRecommendations(history);
    }
  }, []);

  return {
    recommendations,
    loading,
    saveActivity,
    clearHistory
  };
};
