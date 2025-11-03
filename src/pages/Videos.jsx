import { useContent } from '../hooks/useContent';
import { usePlayerContext } from '../contexts/PlayerContext';
import PageHeader from '../components/PageHeader';
import ContentGrid from '../components/ContentGrid';

const Videos = () => {
  const { content, loading, error, search } = useContent('videos');
  const { play } = usePlayerContext();

  const handlePlay = (item) => {
    play(item, content);
  };

  return (
    <div>
      <PageHeader
        title="Videos"
        description="Explore free videos from Pexels"
        onSearch={search}
      />

      {loading && <p className="text-center text-gray-400">Loading videos...</p>}
      {error && <p className="text-center text-red-400">Error: {error}</p>}

      <ContentGrid
        content={content}
        type="video"
        onPlay={handlePlay}
      />
    </div>
  );
};

export default Videos;
