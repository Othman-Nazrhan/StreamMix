import { useState } from 'react';
import { useContent } from '../hooks/useContent';
import { usePlayerContext } from '../contexts/PlayerContext';
import { contentService } from '../services/contentService.js';
import PageHeader from '../components/PageHeader';
import ContentGrid from '../components/ContentGrid';

const Home = () => {
  const { content, loading, error, search } = useContent('mixed');
  const { play } = usePlayerContext();
  const [searchResults, setSearchResults] = useState(null);

  const handlePlay = (item) => {
    play(item, content);
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    try {
      const results = await contentService.searchAll(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const displayContent = searchResults ? Object.entries(searchResults).flatMap(([type, items]) =>
    items.map(item => ({ ...item, type }))
  ) : content;

  return (
    <div>
      <PageHeader
        title="Welcome to StreamMix"
        description="Discover music, videos, podcasts, and more"
        onSearch={handleSearch}
      />

      {loading && <p className="text-center text-gray-400">Loading featured content...</p>}
      {error && <p className="text-center text-red-400">Error: {error}</p>}

      <ContentGrid
        content={displayContent}
        type="mixed"
        onPlay={handlePlay}
      />
    </div>
  );
};

export default Home;
