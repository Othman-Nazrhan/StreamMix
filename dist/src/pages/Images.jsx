import { useState, useEffect } from 'react';
import axios from 'axios';
import ContentCard from '../components/ContentCard';
import SearchBar from '../components/SearchBar';

const Images = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async (query = '') => {
    try {
      const url = query
        ? `https://api.unsplash.com/search/photos?query=${query}&per_page=20`
        : 'https://api.unsplash.com/photos/random?count=20';
      const response = await axios.get(url, {
        headers: { Authorization: 'Client-ID YOUR_UNSPLASH_ACCESS_KEY' }
      });
      setImages(query ? response.data.results : response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchImages(query);
  };

  const handleFavorite = (item) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites.push(item);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Images</h1>
        <p className="text-xl text-gray-400 mb-6">Explore free stock photos</p>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image) => (
          <ContentCard
            key={image.id}
            item={image}
            type="image"
            onPlay={() => {}} // Images don't play
            onFavorite={handleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default Images;
