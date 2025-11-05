import { useState, useEffect } from 'react';
import { ThumbsUp, Heart, Laugh, Angry, Sad } from 'lucide-react';

const REACTION_TYPES = {
  like: { icon: ThumbsUp, color: 'text-blue-500', label: 'Like' },
  love: { icon: Heart, color: 'text-red-500', label: 'Love' },
  funny: { icon: Laugh, color: 'text-yellow-500', label: 'Funny' },
  angry: { icon: Angry, color: 'text-orange-500', label: 'Angry' },
  sad: { icon: Sad, color: 'text-purple-500', label: 'Sad' }
};

const Reactions = ({ itemId, type }) => {
  const [reactions, setReactions] = useState({});
  const [userReaction, setUserReaction] = useState(null);
  const [showReactions, setShowReactions] = useState(false);

  const STORAGE_KEY = `streammix-reactions-${type}-${itemId}`;

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setReactions(data.reactions || {});
        setUserReaction(data.userReaction || null);
      } catch (error) {
        console.error('Error loading reactions:', error);
      }
    }
  }, [STORAGE_KEY]);

  const saveReactions = (newReactions, newUserReaction) => {
    const data = { reactions: newReactions, userReaction: newUserReaction };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const handleReaction = (reactionType) => {
    const newReactions = { ...reactions };
    const prevUserReaction = userReaction;

    // Remove previous reaction if exists
    if (prevUserReaction && newReactions[prevUserReaction]) {
      newReactions[prevUserReaction]--;
      if (newReactions[prevUserReaction] <= 0) {
        delete newReactions[prevUserReaction];
      }
    }

    // Add new reaction
    if (prevUserReaction === reactionType) {
      // User clicked the same reaction, remove it
      setUserReaction(null);
      saveReactions(newReactions, null);
    } else {
      // Add new reaction
      newReactions[reactionType] = (newReactions[reactionType] || 0) + 1;
      setUserReaction(reactionType);
      saveReactions(newReactions, reactionType);
    }

    setReactions(newReactions);
    setShowReactions(false);
  };

  const totalReactions = Object.values(reactions).reduce((sum, count) => sum + count, 0);

  return (
    <div className="relative">
      <button
        onClick={() => setShowReactions(!showReactions)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
          userReaction ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'
        }`}
      >
        {userReaction ? (
          <div className="flex items-center space-x-1">
            {React.createElement(REACTION_TYPES[userReaction].icon, {
              size: 16,
              className: REACTION_TYPES[userReaction].color
            })}
            <span className="text-sm">{REACTION_TYPES[userReaction].label}</span>
          </div>
        ) : (
          <ThumbsUp size={16} />
        )}
        {totalReactions > 0 && (
          <span className="text-sm text-gray-400">{totalReactions}</span>
        )}
      </button>

      {showReactions && (
        <div className="absolute bottom-full mb-2 left-0 bg-gray-800 rounded-lg p-2 shadow-lg border border-gray-700 z-10">
          <div className="flex space-x-2">
            {Object.entries(REACTION_TYPES).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <button
                  key={key}
                  onClick={() => handleReaction(key)}
                  className={`p-2 rounded-full hover:bg-gray-700 transition-colors ${
                    userReaction === key ? 'bg-gray-600' : ''
                  }`}
                  title={config.label}
                >
                  <Icon size={20} className={userReaction === key ? config.color : 'text-gray-400'} />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reactions;
