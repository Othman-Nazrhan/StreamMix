import { useParams } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import { usePlayerContext } from '../contexts/PlayerContext';
import useGlobalSearch from '../hooks/useGlobalSearch';
import PageHeader from './PageHeader';
import ContentGrid from './ContentGrid';

// Route-aware page component to reduce duplication
const Page = ({ enableSearch = false }) => {
  const { type } = useParams();
  const { content, loading, error, search } = useContent(type);
  const { play } = usePlayerContext();
  const { searchResults, searchAll, clearSearch } = useGlobalSearch();

  const handlePlay = (item) => {
    play(item, content);
  };

  const handleSearch = enableSearch ? searchAll : search;

  const displayContent = enableSearch && searchResults
    ? Object.entries(searchResults).flatMap(([searchType, items]) =>
        items.map((item, index) => ({ ...item, type: searchType, uniqueKey: `${searchType}-${item.id || item.stationuuid || index}` }))
      )
    : content;

  const loadingMessage = `Loading ${type}...`;
  const errorMessage = `Error loading ${type}`;

  // Define titles and descriptions based on type
  const pageConfig = {
    music: { title: 'Music', description: 'Discover free music from around the world' },
    videos: { title: 'Videos', description: 'Explore free music videos from Apple' },
    podcasts: { title: 'Podcasts', description: 'Discover free podcasts from around the world' },
    radio: { title: 'Radio', description: 'Listen to radio stations from around the world' },
    images: { title: 'Images', description: 'Explore free stock photos', showPlayer: false },
    mixed: { title: 'Welcome to StreamMix', description: 'Discover music, videos, podcasts, and more' },
  };

  const config = pageConfig[type] || { title: type, description: '' };
  const showPlayer = config.showPlayer !== false;

  return (
    <div>
      <PageHeader
        title={config.title}
        description={config.description}
        onSearch={handleSearch}
      />

      {loading && <p className="text-center text-gray-400">{loadingMessage}</p>}
      {error && <p className="text-center text-red-400">{errorMessage}: {error}</p>}

      <ContentGrid
        content={displayContent}
        type={type}
        onPlay={showPlayer ? handlePlay : undefined}
      />
    </div>
  );
};

export default Page;
