import { useMood } from '../hooks/useMood';
import { X } from 'lucide-react';

const MoodSelector = ({ isOpen, onClose }) => {
  const { selectMood, moodConfigs, currentMoodConfig } = useMood();

  if (!isOpen) return null;

  const handleMoodSelect = (moodKey) => {
    selectMood(moodKey);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Choose your mood</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(moodConfigs).map(([key, config]) => (
            <button
              key={key}
              onClick={() => handleMoodSelect(key)}
              className={`p-4 rounded-lg text-left transition-all hover:scale-105 bg-gradient-to-r ${config.colors} text-white`}
            >
              <h3 className="font-semibold text-lg mb-1">{config.name}</h3>
              <p className="text-sm opacity-90">
                {config.keywords.slice(0, 2).join(', ')}...
              </p>
            </button>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoodSelector;
