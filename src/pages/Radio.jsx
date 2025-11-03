import { useContent } from '../hooks/useContent';
import { usePlayerContext } from '../contexts/PlayerContext';
import PageHeader from '../components/PageHeader';
import ContentGrid from '../components/ContentGrid';

const Radio = () => {
  const { content, loading, error, search } = useContent('radio');
  const { play } = usePlayerContext();

  const handlePlay = (item) => {
    play(item, content);
  };

  return (
    <div>
      <PageHeader
        title="Radio"
        description="Listen to radio stations from around the world"
        onSearch={search}
      />

      {loading && <p className="text-center text-gray-400">Loading radio stations...</p>}
      {error && <p className="text-center text-red-400">Error: {error}</p>}

      <ContentGrid
        content={content}
        type="radio"
        onPlay={handlePlay}
      />
    </div>
  );
};

export default Radio;
