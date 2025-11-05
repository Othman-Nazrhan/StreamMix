import { useState } from 'react';
import { contentService } from '../services/contentService.js';

// Mood configurations with keywords
const MOOD_CONFIGS = {
  happy: {
    name: 'Heureux',
    keywords: ['happy', 'joy', 'fun', 'pop', 'dance', 'party', 'sunny', 'bright'],
    colors: 'from-yellow-400 to-orange-500'
  },
  relax: {
    name: 'Relax',
    keywords: ['relax', 'chill', 'calm', 'ambient', 'lofi', 'peaceful', 'soft'],
    colors: 'from-blue-400 to-purple-500'
  },
  motivate: {
    name: 'Motivé',
    keywords: ['motivation', 'energy', 'power', 'rock', 'electronic', 'upbeat', 'strong'],
    colors: 'from-red-500 to-pink-500'
  },
  focus: {
    name: 'Concentration',
    keywords: ['focus', 'classical', 'instrumental', 'minimal', 'study', 'concentration'],
    colors: 'from-green-400 to-blue-500'
  },
  romantic: {
    name: 'Romantique',
    keywords: ['romantic', 'love', 'slow', 'ballad', 'jazz', 'soft', 'tender'],
    colors: 'from-pink-400 to-red-400'
  },
  adventure: {
    name: 'Aventure',
    keywords: ['adventure', 'travel', 'world', 'folk', 'indie', 'discovery', 'explore'],
    colors: 'from-orange-400 to-yellow-500'
  }
};

// Custom hook for mood-based content selection
export const useMood = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodContent, setMoodContent] = useState([]);
  const [loading, setLoading] = useState(false);

  const selectMood = async (moodKey) => {
    const mood = MOOD_CONFIGS[moodKey];
    if (!mood) return;

    setSelectedMood(moodKey);
    setLoading(true);

    try {
      // Create search query from mood keywords
      const searchQuery = mood.keywords.slice(0, 3).join(' ');

      // Fetch content for each type using mood keywords
      const [music, videos, radio, podcasts, images] = await Promise.all([
        contentService.fetchMusic(searchQuery, 6),
        contentService.fetchVideos(searchQuery, 6),
        contentService.fetchRadioStations(searchQuery, 6),
        contentService.fetchPodcasts(searchQuery, 6),
        contentService.fetchImages(searchQuery, 6)
      ]);

      // Combine and shuffle results
      const combined = [
        ...music.map(item => ({ ...item, type: 'music', mood: moodKey })),
        ...videos.map(item => ({ ...item, type: 'videos', mood: moodKey })),
        ...radio.map(item => ({ ...item, type: 'radio', mood: moodKey })),
        ...podcasts.map(item => ({ ...item, type: 'podcasts', mood: moodKey })),
        ...images.map(item => ({ ...item, type: 'images', mood: moodKey }))
      ].sort(() => Math.random() - 0.5);

      setMoodContent(combined);
    } catch (error) {
      console.error('Error loading mood content:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearMood = () => {
    setSelectedMood(null);
    setMoodContent([]);
  };

  return {
    selectedMood,
    moodContent,
    loading,
    selectMood,
    clearMood,
    moodConfigs: MOOD_CONFIGS,
    currentMoodConfig: selectedMood ? MOOD_CONFIGS[selectedMood] : null
  };
};
