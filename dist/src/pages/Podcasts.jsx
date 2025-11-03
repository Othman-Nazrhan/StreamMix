import { useState, useEffect } from 'react';
import axios from 'axios';
import ContentCard from '../components/ContentCard';
import SearchBar from '../components/SearchBar';
import Player from '../components/Player';

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async (query = '') => {
    try {
      const url = query
        ? `https://podcastindex.org/api/search?q=${query}&max=20`
        : 'https://podcastindex.org/api/search?q=popular&max=20';
      const response = await axios.get(url);
      setPodcasts(response.data.feeds || []);
    } catch (error) {
      console.error('Error fetching podcasts:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchPodcasts(query);
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
    const currentIndex = podcasts.findIndex(podcast => podcast.id === currentItem?.id);
    const nextIndex = (currentIndex + 1) % podcasts.length;
    setCurrentItem(podcasts[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = podcasts.findIndex(podcast => podcast.id === currentItem?.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : podcasts.length - 1;
    setCurrentItem(podcasts[prevIndex]);
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Podcasts</h1>
        <p className="text-xl text-gray-400 mb-6">Discover free podcasts from around the world</p>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {podcasts.map((podcast) => (
          <ContentCard
            key={podcast.id}
            item={podcast}
            type="podcast"
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

export default Podcasts;
