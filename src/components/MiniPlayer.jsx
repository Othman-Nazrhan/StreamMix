import ReactPlayer from 'react-player';
import { Play, Pause, X, Maximize2 } from 'lucide-react';
import { usePlayerContext } from '../contexts/PlayerContext';
import { useState } from 'react';

const MiniPlayer = () => {
  const { currentItem, isPlaying, togglePlayPause, stop } = usePlayerContext();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!currentItem) return null;

  const getUrl = () => {
    if (currentItem.audio) return currentItem.audio;
    if (currentItem.video_files) return currentItem.video_files[0]?.link;
    if (currentItem.url) return currentItem.url;
    if (currentItem.listen_url) return currentItem.listen_url;
    return '';
  };

  const getTitle = () => {
    return currentItem.name || currentItem.title || 'Unknown';
  };

  const getImage = () => {
    const fallback = '/placeholder.jpg';
    if (currentItem.album_image) return currentItem.album_image;
    if (currentItem.image) return currentItem.image;
    if (currentItem.favicon) return currentItem.favicon;
    return fallback;
  };

  return (
    <div className={`fixed bottom-4 right-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50 transition-all duration-300 ${
      isExpanded ? 'w-80 h-48' : 'w-64 h-16'
    }`}>
      <div className="flex items-center p-3 h-full">
        {/* Mini view */}
        {!isExpanded && (
          <>
            <img
              src={getImage()}
              alt={getTitle()}
              className="w-10 h-10 rounded object-cover mr-3"
              onError={(e) => { e.target.src = '/placeholder.jpg'; }}
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium truncate">{getTitle()}</h4>
              <p className="text-xs text-gray-400 truncate">
                {currentItem.artist_name || currentItem.user?.name || currentItem.author || ''}
              </p>
            </div>
            <div className="flex items-center space-x-2 ml-2">
              <button
                onClick={togglePlayPause}
                className="p-1 hover:bg-gray-700 rounded"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button
                onClick={() => setIsExpanded(true)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <Maximize2 size={16} />
              </button>
              <button
                onClick={stop}
                className="p-1 hover:bg-gray-700 rounded text-red-400 hover:text-red-300"
              >
                <X size={16} />
              </button>
            </div>
          </>
        )}

        {/* Expanded view */}
        {isExpanded && (
          <div className="w-full h-full flex flex-col">
            <div className="flex items-center justify-between p-2 border-b border-gray-700">
              <h4 className="text-sm font-medium truncate flex-1">{getTitle()}</h4>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:bg-gray-700 rounded ml-2"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 flex">
              <img
                src={getImage()}
                alt={getTitle()}
                className="w-20 h-full object-cover rounded-l"
                onError={(e) => { e.target.src = '/placeholder.jpg'; }}
              />
              <div className="flex-1 p-3 flex flex-col justify-center">
                <h4 className="font-medium text-sm mb-1">{getTitle()}</h4>
                <p className="text-xs text-gray-400 mb-3">
                  {currentItem.artist_name || currentItem.user?.name || currentItem.author || ''}
                </p>
                <button
                  onClick={togglePlayPause}
                  className="self-start p-2 bg-blue-600 hover:bg-blue-700 rounded-full"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hidden ReactPlayer for audio */}
      <ReactPlayer
        url={getUrl()}
        playing={isPlaying}
        volume={0.5}
        width="0"
        height="0"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default MiniPlayer;
