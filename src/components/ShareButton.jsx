import { Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const ShareButton = ({ item, type }) => {
  const [copied, setCopied] = useState(false);

  const generateShareUrl = () => {
    const baseUrl = window.location.origin;
    const itemId = item.id || item.stationuuid;
    return `${baseUrl}/share?type=${type}&id=${itemId}`;
  };

  const handleShare = async () => {
    const shareUrl = generateShareUrl();
    const shareData = {
      title: item.name || item.title || 'StreamMix Content',
      text: `Discover this content on StreamMix: ${item.name || item.title}`,
      url: shareUrl
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
        copyToClipboard(shareUrl);
      }
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
      title="Share this content"
    >
      {copied ? (
        <>
          <Check size={16} />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Share2 size={16} />
          <span>Share</span>
        </>
      )}
    </button>
  );
};

export default ShareButton;
