import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import ContentGrid from './ContentGrid';

const InfiniteScrollWrapper = ({ type, onPlay, onFavorite }) => {
  const { content, loading, error, hasMore, loadMoreTrigger } = useInfiniteScroll(type);

  return (
    <div>
      <ContentGrid
        content={content}
        type={type}
        onPlay={onPlay}
        onFavorite={onFavorite}
      />

      {/* Loading trigger element */}
      <div ref={loadMoreTrigger} className="flex justify-center py-8">
        {loading && (
          <div className="flex items-center space-x-2 text-gray-400">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span>Chargement...</span>
          </div>
        )}

        {!loading && hasMore && (
          <div className="text-gray-400">
            Faites défiler pour charger plus de contenu
          </div>
        )}

        {!loading && !hasMore && content.length > 0 && (
          <div className="text-gray-400">
            Plus de contenu disponible
          </div>
        )}
      </div>

      {error && (
        <div className="text-center py-8">
          <p className="text-red-400 mb-4">Erreur lors du chargement: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            Recharger la page
          </button>
        </div>
      )}
    </div>
  );
};

export default InfiniteScrollWrapper;
