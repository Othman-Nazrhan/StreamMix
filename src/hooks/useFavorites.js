import { useState, useEffect } from 'react';

// Custom hook for favorites management
export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
        setFavorites([]);
      }
    }
  }, []);

  const addToFavorites = (item) => {
    setFavorites(prev => {
      const newFavorites = [...prev, item];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const removeFromFavorites = (itemId, type) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(item => {
        if (type === 'radio') {
          return item.stationuuid !== itemId;
        }
        return item.id !== itemId;
      });
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (itemId, type) => {
    return favorites.some(item => {
      if (type === 'radio') {
        return item.stationuuid === itemId;
      }
      return item.id === itemId;
    });
  };

  const toggleFavorite = (item) => {
    const itemId = item.stationuuid || item.id;
    const type = item.type || 'music';

    if (isFavorite(itemId, type)) {
      removeFromFavorites(itemId, type);
    } else {
      addToFavorites(item);
    }
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favorites');
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    clearFavorites
  };
};
