import { useState, useEffect } from 'react';
import axios from 'axios';
import ContentCard from '../components/ContentCard';
import SearchBar from '../components/SearchBar';
import Player from '../components/Player';

const Music = () => {
  const [tracks, setTracks] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async (query = '') => {
    try {
      const url = query
        ? `https://api.jamendo.com/v3.0/tracks/?client_id=YOUR_JAMENDO_CLIENT_ID&search=${query}&limit=20`
        : 'https://api.jamendo.com/v3.0/tracks/?client_id=YOUR_JAMENDO_CLIENT_ID&limit=20';
      const response = await axios.get(url);
      setTracks(response.data.results || []);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchTracks(query);
  };

  const handlePlay = (item) => {
    setCurrentItem(item);
    setIsPlaying(true);
  };

  const handleFavorite = (item) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites.push(item);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const currentIndex = tracks.findIndex(track => track.id === currentItem?.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentItem(tracks[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = tracks.findIndex(track => track.id === currentItem?.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : tracks.length - 1;
    setCurrentItem(tracks[prevIndex]);
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Music</h1>
        <p className="text-xl text-gray-400 mb-6">Discover free music from around the world</p>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tracks.map((track) => (
          <ContentCard
            key={track.id}
            item={track}
            type="music"
            onPlay={handlePlay}
            onFavorite={handleFavorite}
          />
        ))}
      </div>

      <Player
        currentItem={currentItem}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        volume={volume}
        onVolumeChange={setVolume}
      />
    </div>
  );
};

export default Music;
