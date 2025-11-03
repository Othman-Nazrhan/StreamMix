import { useState, useEffect } from 'react';
import axios from 'axios';
import ContentCard from '../components/ContentCard';
import SearchBar from '../components/SearchBar';
import Player from '../components/Player';

const Radio = () => {
  const [stations, setStations] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async (query = '') => {
    try {
      const url = query
        ? `https://de1.api.radio-browser.info/json/stations/search?name=${query}&limit=20`
        : 'https://de1.api.radio-browser.info/json/stations/topvote/20';
      const response = await axios.get(url);
      setStations(response.data || []);
    } catch (error) {
      console.error('Error fetching radio stations:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchStations(query);
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
    const currentIndex = stations.findIndex(station => station.stationuuid === currentItem?.stationuuid);
    const nextIndex = (currentIndex + 1) % stations.length;
    setCurrentItem(stations[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = stations.findIndex(station => station.stationuuid === currentItem?.stationuuid);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : stations.length - 1;
    setCurrentItem(stations[prevIndex]);
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Radio</h1>
        <p className="text-xl text-gray-400 mb-6">Listen to radio stations from around the world</p>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {stations.map((station) => (
          <ContentCard
            key={station.stationuuid}
            item={station}
            type="radio"
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

export default Radio;
