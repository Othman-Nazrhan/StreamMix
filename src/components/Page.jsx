import { useContent } from '../hooks/useContent';
import { usePlayerContext } from '../contexts/PlayerContext';
import PageHeader from './PageHeader';
import ContentGrid from './ContentGrid';

// Generic page component to reduce duplication
const Page = ({ type, title, description, showPlayer = true }) => {
  const { content, loading, error, search } = useContent(type);
  const { play } = usePlayerContext();

  const handlePlay = (item) => {
    play(item, content);
  };

  const loadingMessage = `Loading ${type}...`;
  const errorMessage = `Error loading ${type}`;

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        onSearch={search}
      />

      {loading && <p className="text-center text-gray-400">{loadingMessage}</p>}
      {error && <p className="text-center text-red-400">{errorMessage}: {error}</p>}

      <ContentGrid
        content={content}
        type={type}
        onPlay={showPlayer ? handlePlay : undefined}
      />
    </div>
  );
};

export default Page;
