import { Heart, Play } from 'lucide-react';

const ContentCard = ({ item, type, onPlay, onFavorite }) => {
  const getImage = () => {
    switch (type) {
      case 'music':
        return item.album_image || item.image || '/placeholder-music.jpg';
      case 'video':
        return item.image || item.thumbnail || '/placeholder-video.jpg';
      case 'radio':
        return item.favicon || '/placeholder-radio.jpg';
      case 'podcast':
        return item.image || item.thumbnail || '/placeholder-podcast.jpg';
      case 'image':
        return item.urls?.regular || item.src || '/placeholder-image.jpg';
      default:
        return '/placeholder.jpg';
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'music':
        return item.name || item.title;
      case 'video':
        return item.title || item.name;
      case 'radio':
        return item.name;
      case 'podcast':
        return item.title;
      case 'image':
        return item.alt_description || 'Image';
      default:
        return 'Content';
    }
  };

  const getSubtitle = () => {
    switch (type) {
      case 'music':
        return item.artist_name || item.artist;
      case 'video':
        return item.user?.name || 'Video';
      case 'radio':
        return item.country || 'Radio';
      case 'podcast':
        return item.author || 'Podcast';
      case 'image':
        return item.user?.name || 'Photo';
      default:
        return '';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="relative">
        <img
          src={getImage()}
          alt={getTitle()}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = '/placeholder.jpg';
          }}
        />
        <button
          onClick={() => onPlay(item)}
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
        >
          <Play size={48} className="text-white" />
        </button>
        <button
          onClick={() => onFavorite(item)}
          className="absolute top-2 right-2 p-2 bg-gray-900 bg-opacity-75 rounded-full hover:bg-opacity-100 transition-colors"
        >
          <Heart size={20} className="text-red-500" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{getTitle()}</h3>
        <p className="text-gray-400 text-sm truncate">{getSubtitle()}</p>
      </div>
    </div>
  );
};

export default ContentCard;
