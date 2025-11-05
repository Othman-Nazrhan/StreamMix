import { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { contentService } from '../services/contentService.js';

// Custom hook for infinite scroll functionality
export const useInfiniteScroll = (type, initialQuery = '') => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(initialQuery);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      let newContent = [];
      const limit = 20;

      switch (type) {
        case 'music':
          newContent = await contentService.fetchMusic(query, limit);
          break;
        case 'videos':
          newContent = await contentService.fetchVideos(query, limit);
          break;
        case 'radio':
          newContent = await contentService.fetchRadioStations(query, limit);
          break;
        case 'podcasts':
          newContent = await contentService.fetchPodcasts(query, limit);
          break;
        case 'images':
          newContent = await contentService.fetchImages(query, limit);
          break;
        case 'mixed':
          newContent = await contentService.fetchMixedContent(limit);
          break;
        default:
          newContent = [];
      }

      if (newContent.length === 0) {
        setHasMore(false);
      } else {
        setContent(prev => [...prev, ...newContent]);
        setPage(prev => prev + 1);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error loading more content:', err);
    } finally {
      setLoading(false);
    }
  }, [type, query, loading, hasMore]);

  const search = useCallback((newQuery) => {
    setQuery(newQuery);
    setContent([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setContent([]);
    setPage(1);
    setHasMore(true);
    setError(null);
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMore();
    }
  }, [inView, hasMore, loading, loadMore]);

  useEffect(() => {
    // Reset when type changes
    reset();
  }, [type, reset]);

  return {
    content,
    loading,
    error,
    hasMore,
    loadMoreTrigger: ref,
    search,
    reset
  };
};
