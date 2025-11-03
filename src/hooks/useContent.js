import { useState, useEffect } from 'react';
import { contentService } from '../services/contentService.js';

// Custom hook for content management
export const useContent = (type, initialQuery = '') => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(initialQuery);

  const fetchContent = async (searchQuery = '') => {
    setLoading(true);
    setError(null);
    try {
      let data;
      switch (type) {
        case 'music':
          data = await contentService.fetchMusic(searchQuery);
          break;
        case 'videos':
          data = await contentService.fetchVideos(searchQuery);
          break;
        case 'radio':
          data = await contentService.fetchRadioStations(searchQuery);
          break;
        case 'podcasts':
          data = await contentService.fetchPodcasts(searchQuery);
          break;
        case 'images':
          data = await contentService.fetchImages(searchQuery);
          break;
        case 'mixed':
          data = await contentService.fetchMixedContent();
          break;
        default:
          data = [];
      }
      setContent(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent(query);
  }, [type, query]);

  const search = (newQuery) => {
    setQuery(newQuery);
  };

  return { content, loading, error, search, refetch: () => fetchContent(query) };
};
