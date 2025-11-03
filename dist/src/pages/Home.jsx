import { useState, useEffect } from 'react';
import axios from 'axios';
import ContentCard from '../components/ContentCard';
import SearchBar from '../components/SearchBar';
import Player from '../components/Player';

const Home = () => {
  const [featuredContent, setFeaturedContent] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    fetchFeaturedContent();
  }, []);

  const fetchFeaturedContent = async () => {
    try {
      const [musicRes, videoRes, radioRes, podcastRes, imageRes] = await Promise.all([
        axios.get('https://api.jamendo.com/v3.0/tracks/?client_id=YOUR_JAMENDO_CLIENT_ID&limit=5'),
        axios.get('https://api.pexels.com/videos/popular?per_page=5', {
          headers: { Authorization: 'YOUR_PEXELS_API_KEY' }
        }),
        axios.get('https://de1.api.radio-browser.info/json/stations/topvote/5'),
        axios.get('https://podcastindex.org/api/search?q=popular&max=5'),
        axios.get('https://api.unsplash.com/photos/random?count=5', {
          headers: { Authorization: 'Client-ID YOUR_UNSPLASH_ACCESS_KEY' }
        })
      ]);

      const mixed = [
        ...musicRes.data.results.map(item => ({ ...item, type: 'music' })),
        ...videoRes.data.videos.map(item => ({ ...item, type: 'video' })),
        ...radioRes.data.map(item => ({ ...item, type: 'radio' })),
        ...podcastRes.data.feeds.map(item => ({ ...item, type: 'podcast' })),
        ...imageRes.data.map(item => ({ ...item, type: 'image' }))
      ];

      setFeaturedContent(mixed.sort(() => Math.random() - 0.5).slice(0, 20));
    } catch (error) {
      console.error('Error fetching featured content:', error);
    }
  };

  const handleSearch = async (query) => {
    try {
      const [musicRes, videoRes, radioRes, podcastRes, imageRes] = await Promise.all([
        axios.get(`https://api.jamendo.com/v3.0/tracks/?client_id=YOUR_JAMENDO_CLIENT_ID&search=${query}&limit=10`),
        axios.get(`https://api.pexels.com/videos/search?query=${query}&per_page=10`, {
          headers: { Authorization: 'YOUR_PEXELS_API_KEY' }
        }),
        axios.get(`https://de1.api.radio-browser.info/json/stations/search?name=${query}&limit=10`),
        axios.get(`https://podcastindex.org/api/search?q=${query}&max=10`),
        axios.get(`https://api.unsplash.com/search/photos?query=${query}&per_page=10`, {
          headers: { Authorization: 'Client-ID YOUR_UNSPLASH_ACCESS_KEY' }
        })
      ]);

      setSearchResults({
        music: musicRes.data.results || [],
        videos: videoRes.data.videos || [],
        radio: radioRes.data || [],
        podcasts: podcastRes.data.feeds || [],
        images: imageRes.data.results || []
      });
    } catch (error) {
      console.error('Error searching:', error);
    }
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
    // Implement next logic
  };

  const handlePrevious = () => {
    // Implement previous logic
  };

  const content = searchResults ? Object.entries(searchResults).flatMap(([type, items]) =>
    items.map(item => ({ ...item, type }))
  ) : featuredContent;

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to StreamMix</h1>
        <p className="text-xl text-gray-400 mb-6">Discover music, videos, podcasts, and more</p>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {content.map((item, index) => (
          <ContentCard
            key={`${item.type}-${index}`}
            item={item}
            type={item.type}
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

export default Home;
