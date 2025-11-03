import { useState, useCallback } from 'react';

// Custom hook for player state management
export const usePlayer = () => {
  const [currentItem, setCurrentItem] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const play = useCallback((item, itemList = []) => {
    setCurrentItem(item);
    setIsPlaying(true);
    if (itemList.length > 0) {
      setPlaylist(itemList);
      const index = itemList.findIndex(i => i.id === item.id || i.stationuuid === item.stationuuid);
      setCurrentIndex(index);
    }
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const resume = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const next = useCallback(() => {
    if (playlist.length > 0 && currentIndex >= 0) {
      const nextIndex = (currentIndex + 1) % playlist.length;
      setCurrentIndex(nextIndex);
      setCurrentItem(playlist[nextIndex]);
    }
  }, [playlist, currentIndex]);

  const previous = useCallback(() => {
    if (playlist.length > 0 && currentIndex >= 0) {
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : playlist.length - 1;
      setCurrentIndex(prevIndex);
      setCurrentItem(playlist[prevIndex]);
    }
  }, [playlist, currentIndex]);

  const setVolumeLevel = useCallback((level) => {
    setVolume(Math.max(0, Math.min(1, level)));
  }, []);

  const toggleMute = useCallback(() => {
    setVolume(prev => prev > 0 ? 0 : 0.5);
  }, []);

  const stop = useCallback(() => {
    setIsPlaying(false);
    setCurrentItem(null);
    setCurrentIndex(-1);
  }, []);

  return {
    currentItem,
    isPlaying,
    volume,
    playlist,
    currentIndex,
    play,
    pause,
    resume,
    togglePlayPause,
    next,
    previous,
    setVolumeLevel,
    toggleMute,
    stop
  };
};
