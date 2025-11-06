import { useState, useEffect } from 'react';
import { contentService } from '../services/contentService';
import { useVotesContext } from '../contexts/VotesContext';
import { usePlayerContext } from '../contexts/PlayerContext';
import { useFavoritesContext } from '../contexts/FavoritesContext';
import BattleGrid from '../components/BattleGrid';
import PageHeader from '../components/PageHeader';

const BattlePage = () => {
  const [battleItems, setBattleItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addVote } = useVotesContext();
  const { playTrack } = usePlayerContext();
  const { toggleFavorite, isFavorite } = useFavoritesContext();

  // Fetch random mixed content for battle
  const fetchBattleItems = async () => {
    setLoading(true);
    try {
      const mixedContent = await contentService.fetchMixedContent(10); // Fetch more to randomize
      // Shuffle and pick 2 random items
      const shuffled = mixedContent.sort(() => Math.random() - 0.5);
      setBattleItems(shuffled.slice(0, 2));
    } catch (error) {
      console.error('Error fetching battle items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBattleItems();
  }, []);

  const handleVote = (item) => {
    addVote(item.uniqueKey || `${item.type}-${item.id || item.stationuuid}`);
    // Fetch new items after voting
    fetchBattleItems();
  };

  const handlePlay = (item) => {
    playTrack(item);
  };

  const handleFavorite = (item) => {
    toggleFavorite(item);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-xl">Preparing Battle...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <PageHeader title="Stream Battle" subtitle="Vote for your favorite content!" />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Choose Your Winner!</h2>
          <p className="text-gray-400">Click the heart to vote for your favorite</p>
        </div>
        <BattleGrid
          items={battleItems}
          onVote={handleVote}
          onPlay={handlePlay}
          onFavorite={handleFavorite}
        />
        <div className="text-center mt-8">
          <button
            onClick={fetchBattleItems}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full"
          >
            New Battle
          </button>
        </div>
      </div>
    </div>
  );
};

export default BattlePage;
