import { useContent } from '../hooks/useContent';
import PageHeader from '../components/PageHeader';
import ContentGrid from '../components/ContentGrid';

const Images = () => {
  const { content, loading, error, search } = useContent('images');

  return (
    <div>
      <PageHeader
        title="Images"
        description="Explore free stock photos"
        onSearch={search}
      />

      {loading && <p className="text-center text-gray-400">Loading images...</p>}
      {error && <p className="text-center text-red-400">Error: {error}</p>}

      <ContentGrid
        content={content}
        type="image"
      />
    </div>
  );
};

export default Images;
