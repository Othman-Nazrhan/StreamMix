import { useState, useEffect } from 'react';

// Custom hook for play history and favorites management
export const useHistory = () => {
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const HISTORY_KEY = 'streammix-play-history';
  const FAVORITES_KEY = 'streammix-favorites';

  useEffect(() => {
    // Load history
    const storedHistory = localStorage.getItem(HISTORY_KEY);
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch (error) {
        console.error('Error parsing history:', error);
      }
    }

    // Load favorites
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Error parsing favorites:', error);
      }
    }
  }, []);

  const addToHistory = (item) => {
    const historyEntry = {
      ...item,
      playedAt: Date.now(),
      id: item.id || item.stationuuid || `temp-${Date.now()}`
    };

    setHistory(prev => {
      // Remove if already exists, then add to beginning
      const filtered = prev.filter(h => h.id !== historyEntry.id);
      const updated = [historyEntry, ...filtered].slice(0, 50); // Keep last 50
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const addToFavorites = (item) => {
    const favoriteEntry = {
      ...item,
      addedAt: Date.now(),
      id: item.id || item.stationuuid || `fav-${Date.now()}`
    };

    setFavorites(prev => {
      // Check if already favorited
      if (prev.some(f => f.id === favoriteEntry.id)) {
        return prev;
      }
      const updated = [...prev, favoriteEntry];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromFavorites = (itemId) => {
    setFavorites(prev => {
      const updated = prev.filter(f => f.id !== itemId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (itemId) => {
    return favorites.some(f => f.id === itemId);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem(FAVORITES_KEY);
  };

  const getMyContent = () => {
    return {
      history,
      favorites,
      all: [...favorites, ...history.filter(h => !favorites.some(f => f.id === h.id))]
    };
  };

  return {
    history,
    favorites,
    addToHistory,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearHistory,
    clearFavorites,
    getMyContent
  };
};
