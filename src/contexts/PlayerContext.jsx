import { createContext, useContext } from 'react';
import { usePlayer } from '../hooks/usePlayer.js';

// Player context for global player state
const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const playerState = usePlayer();

  return (
    <PlayerContext.Provider value={playerState}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayerContext must be used within a PlayerProvider');
  }
  return context;
};
