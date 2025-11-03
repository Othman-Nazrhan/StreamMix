import { useContent } from '../hooks/useContent';
import { usePlayerContext } from '../contexts/PlayerContext';
import PageHeader from '../components/PageHeader';
import ContentGrid from '../components/ContentGrid';

const Music = () => {
  const { content, loading, error, search } = useContent('music');
  const { play } = usePlayerContext();

  const handlePlay = (item) => {
    play(item, content);
  };

  return (
    <div>
      <PageHeader
        title="Music"
        description="Discover free music from around the world"
        onSearch={search}
      />

      {loading && <p className="text-center text-gray-400">Loading music...</p>}
      {error && <p className="text-center text-red-400">Error: {error}</p>}

      <ContentGrid
        content={content}
        type="music"
        onPlay={handlePlay}
      />
    </div>
  );
};

export default Music;
