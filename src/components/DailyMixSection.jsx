import { RefreshCw } from 'lucide-react';
import { useDailyMix } from '../hooks/useDailyMix';
import ContentGrid from './ContentGrid';
import { usePlayerContext } from '../contexts/PlayerContext';

const DailyMixSection = () => {
  const { dailyMix, loading, error, refresh } = useDailyMix();
  const { play } = usePlayerContext();

  const handlePlay = (item) => {
    play(item, dailyMix);
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Daily Mix</h2>
          <p className="text-gray-400">Discover a random mix of fresh content every day</p>
        </div>
        <button
          onClick={refresh}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          <span>{loading ? 'Generating...' : 'Refresh'}</span>
        </button>
      </div>

      {error && (
        <div className="text-center py-8">
          <p className="text-red-400 mb-4">Error loading daily mix: {error}</p>
          <button
            onClick={refresh}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            Try again
          </button>
        </div>
      )}

      {!error && (
        <ContentGrid
          content={dailyMix}
          onPlay={handlePlay}
        />
      )}
    </section>
  );
};

export default DailyMixSection;
