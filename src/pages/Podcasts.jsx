import { useContent } from '../hooks/useContent';
import { usePlayerContext } from '../contexts/PlayerContext';
import PageHeader from '../components/PageHeader';
import ContentGrid from '../components/ContentGrid';

const Podcasts = () => {
  const { content, loading, error, search } = useContent('podcasts');
  const { play } = usePlayerContext();

  const handlePlay = (item) => {
    play(item, content);
  };

  return (
    <div>
      <PageHeader
        title="Podcasts"
        description="Discover free podcasts from around the world"
        onSearch={search}
      />

      {loading && <p className="text-center text-gray-400">Loading podcasts...</p>}
      {error && <p className="text-center text-red-400">Error: {error}</p>}

      <ContentGrid
        content={content}
        type="podcast"
        onPlay={handlePlay}
      />
    </div>
  );
};

export default Podcasts;
