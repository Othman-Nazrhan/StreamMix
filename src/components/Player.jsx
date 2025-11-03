import ReactPlayer from 'react-player';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';
import { usePlayerContext } from '../contexts/PlayerContext';

const Player = () => {
  const {
    currentItem,
    isPlaying,
    volume,
    togglePlayPause,
    next,
    previous,
    setVolumeLevel,
    toggleMute
  } = usePlayerContext();

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

  const getSubtitle = () => {
    return currentItem.artist_name || currentItem.user?.name || currentItem.author || '';
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{getTitle()}</h3>
          <p className="text-gray-400 text-sm">{getSubtitle()}</p>
        </div>

        <div className="flex items-center space-x-2">
          <button onClick={previous} className="p-2 hover:bg-gray-700 rounded">
            <SkipBack size={20} />
          </button>
          <button onClick={togglePlayPause} className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full">
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button onClick={next} className="p-2 hover:bg-gray-700 rounded">
            <SkipForward size={20} />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button onClick={toggleMute} className="p-2 hover:bg-gray-700 rounded">
            {volume > 0 ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolumeLevel(parseFloat(e.target.value))}
            className="w-20"
          />
        </div>
      </div>

      <ReactPlayer
        url={getUrl()}
        playing={isPlaying}
        volume={volume}
        width="0"
        height="0"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default Player;
