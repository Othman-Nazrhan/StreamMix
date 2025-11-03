import { useState, useEffect } from 'react';
import axios from 'axios';
import ContentCard from '../components/ContentCard';
import SearchBar from '../components/SearchBar';
import Player from '../components/Player';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async (query = '') => {
    try {
      const url = query
        ? `https://api.pexels.com/videos/search?query=${query}&per_page=20`
        : 'https://api.pexels.com/videos/popular?per_page=20';
      const response = await axios.get(url, {
        headers: { Authorization: 'YOUR_PEXELS_API_KEY' }
      });
      setVideos(response.data.videos || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchVideos(query);
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
    const currentIndex = videos.findIndex(video => video.id === currentItem?.id);
    const nextIndex = (currentIndex + 1) % videos.length;
    setCurrentItem(videos[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = videos.findIndex(video => video.id === currentItem?.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : videos.length - 1;
    setCurrentItem(videos[prevIndex]);
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Videos</h1>
        <p className="text-xl text-gray-400 mb-6">Explore free videos from Pexels</p>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <ContentCard
            key={video.id}
            item={video}
            type="video"
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

export default Videos;
