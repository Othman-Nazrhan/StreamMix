import { createContext, useContext } from 'react';
import { useFavorites } from '../hooks/useFavorites.js';

// Favorites context for global favorites state
const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const favoritesState = useFavorites();

  return (
    <FavoritesContext.Provider value={favoritesState}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavoritesContext must be used within a FavoritesProvider');
  }
  return context;
};
