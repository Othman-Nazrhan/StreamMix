import { useState } from 'react';
import { contentService } from '../services/contentService.js';

const useGlobalSearch = () => {
  const [searchResults, setSearchResults] = useState(null);

  const searchAll = async (query) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    try {
      const results = await contentService.searchAll(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching:', error);
      throw error; // Re-throw to allow caller to handle
    }
  };

  const clearSearch = () => {
    setSearchResults(null);
  };

  return {
    searchResults,
    searchAll,
    clearSearch,
  };
};

export default useGlobalSearch;
