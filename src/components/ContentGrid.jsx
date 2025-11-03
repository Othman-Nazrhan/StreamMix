import ContentCard from './ContentCard';

// Reusable grid component for displaying content
const ContentGrid = ({ content, type, onPlay, onFavorite }) => {
  if (!content || content.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No content available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {content.map((item, index) => (
        <ContentCard
          key={item.id || item.stationuuid || index}
          item={item}
          type={type}
          onPlay={onPlay}
          onFavorite={onFavorite}
        />
      ))}
    </div>
  );
};

export default ContentGrid;
