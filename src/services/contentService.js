import axios from 'axios';
import { API_KEYS, API_ENDPOINTS } from './api.js';

// Content fetching service
export const contentService = {
  // Music
  async fetchMusic(query = '', limit = 20) {
    try {
      const url = `${API_ENDPOINTS.JAMENDO_TRACKS}?client_id=${API_KEYS.JAMENDO}&limit=${limit}${query ? `&search=${query}` : ''}`;
      const response = await axios.get(url);
      return response.data.results || [];
    } catch (error) {
      console.error('Error fetching music:', error);
      return [];
    }
  },

  // Videos
  async fetchVideos(query = '', limit = 20) {
    try {
      const url = query
        ? `${API_ENDPOINTS.PEXELS_VIDEOS_SEARCH}?query=${query}&per_page=${limit}`
        : `${API_ENDPOINTS.PEXELS_VIDEOS_POPULAR}?per_page=${limit}`;
      const response = await axios.get(url, {
        headers: { Authorization: API_KEYS.PEXELS }
      });
      return response.data.videos || [];
    } catch (error) {
      console.error('Error fetching videos:', error);
      return [];
    }
  },

  // Radio
  async fetchRadioStations(query = '', limit = 20) {
    try {
      const url = query
        ? `${API_ENDPOINTS.RADIO_BROWSER}search?name=${query}&limit=${limit}`
        : `${API_ENDPOINTS.RADIO_BROWSER}topvote/${limit}`;
      const response = await axios.get(url);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching radio stations:', error);
      return [];
    }
  },

  // Podcasts
  async fetchPodcasts(query = '', limit = 20) {
    try {
      const url = `${API_ENDPOINTS.PODCAST_INDEX}?q=${query || 'popular'}&max=${limit}`;
      const response = await axios.get(url);
      return response.data.feeds || [];
    } catch (error) {
      console.error('Error fetching podcasts:', error);
      return [];
    }
  },

  // Images
  async fetchImages(query = '', limit = 20) {
    try {
      const url = query
        ? `${API_ENDPOINTS.UNSPLASH_SEARCH}?query=${query}&per_page=${limit}`
        : `${API_ENDPOINTS.UNSPLASH_PHOTOS}?count=${limit}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Client-ID ${API_KEYS.UNSPLASH}` }
      });
      return query ? response.data.results : response.data;
    } catch (error) {
      console.error('Error fetching images:', error);
      return [];
    }
  },

  // Mixed content for home page
  async fetchMixedContent(limit = 5) {
    try {
      const [music, videos, radio, podcasts, images] = await Promise.all([
        this.fetchMusic('', limit),
        this.fetchVideos('', limit),
        this.fetchRadioStations('', limit),
        this.fetchPodcasts('', limit),
        this.fetchImages('', limit)
      ]);

      return [
        ...music.map(item => ({ ...item, type: 'music' })),
        ...videos.map(item => ({ ...item, type: 'video' })),
        ...radio.map(item => ({ ...item, type: 'radio' })),
        ...podcasts.map(item => ({ ...item, type: 'podcast' })),
        ...images.map(item => ({ ...item, type: 'image' }))
      ].sort(() => Math.random() - 0.5);
    } catch (error) {
      console.error('Error fetching mixed content:', error);
      return [];
    }
  },

  // Search across all content types
  async searchAll(query) {
    try {
      const [music, videos, radio, podcasts, images] = await Promise.all([
        this.fetchMusic(query, 10),
        this.fetchVideos(query, 10),
        this.fetchRadioStations(query, 10),
        this.fetchPodcasts(query, 10),
        this.fetchImages(query, 10)
      ]);

      return {
        music,
        videos,
        radio,
        podcasts,
        images
      };
    } catch (error) {
      console.error('Error searching:', error);
      return { music: [], videos: [], radio: [], podcasts: [], images: [] };
    }
  }
};
