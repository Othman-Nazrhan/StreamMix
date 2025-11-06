import ContentCard from './ContentCard';

// Component for displaying two content items side by side for battle
const BattleGrid = ({ items, onVote, onPlay, onFavorite }) => {
  if (!items || items.length < 2) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">Loading battle items...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
      {items.slice(0, 2).map((item, index) => (
        <div key={item.uniqueKey || `${item.type}-${item.id || item.stationuuid || index}`} className="flex-1 max-w-md">
          <ContentCard
            item={item}
            type={item.type}
            onPlay={onPlay}
            onFavorite={onFavorite}
          />
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => onVote(item)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full text-2xl"
            >
              ❤️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BattleGrid;
