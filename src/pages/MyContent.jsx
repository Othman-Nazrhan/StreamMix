import { useHistory } from '../hooks/useHistory';
import { usePlayerContext } from '../contexts/PlayerContext';
import ContentGrid from '../components/ContentGrid';
import { History, Heart, Trash2 } from 'lucide-react';

const MyContent = () => {
  const { getMyContent, removeFromFavorites, clearHistory, clearFavorites } = useHistory();
  const { play } = usePlayerContext();
  const { history, favorites, all } = getMyContent();

  const handlePlay = (item) => {
    play(item, all);
  };

  const handleRemoveFavorite = (itemId) => {
    removeFromFavorites(itemId);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">My Content</h1>
        <p className="text-xl text-gray-400">Your favorites and listening history</p>
      </div>

      {/* Favorites Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Heart className="text-red-500" size={24} />
            <h2 className="text-2xl font-bold">Favorites</h2>
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm">
              {favorites.length}
            </span>
          </div>
          {favorites.length > 0 && (
            <button
              onClick={clearFavorites}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
              <span>Clear favorites</span>
            </button>
          )}
        </div>

        {favorites.length > 0 ? (
          <ContentGrid
            content={favorites}
            onPlay={handlePlay}
            onFavorite={handleRemoveFavorite}
          />
        ) : (
          <div className="text-center py-12">
            <Heart size={48} className="text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No favorites yet</p>
            <p className="text-gray-500 text-sm">Click the heart to add content to your favorites</p>
          </div>
        )}
      </section>

      {/* History Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <History className="text-blue-500" size={24} />
            <h2 className="text-2xl font-bold">History</h2>
            <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
              {history.length}
            </span>
          </div>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
              <span>Clear history</span>
            </button>
          )}
        </div>

        {history.length > 0 ? (
          <ContentGrid
            content={history}
            onPlay={handlePlay}
          />
        ) : (
          <div className="text-center py-12">
            <History size={48} className="text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No listening history</p>
            <p className="text-gray-500 text-sm">Your recent listens will appear here</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default MyContent;
