import axios from 'axios';
import { API_ENDPOINTS } from './api.js';

// Content fetching service
export const contentService = {
  // Generic fetch method to reduce duplication
  async _fetch(url, errorMessage) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(errorMessage, error);
      return [];
    }
  },

  // Music
  async fetchMusic(query = '', limit = 20) {
    const url = `${API_ENDPOINTS.ITUNES_SEARCH}?term=${query || 'music'}&media=music&entity=song&limit=${limit}`;
    const data = await this._fetch(url, 'Error fetching music:');
    return data.results || [];
  },

  // Videos
  async fetchVideos(query = '', limit = 20) {
    const url = `${API_ENDPOINTS.ITUNES_SEARCH}?term=${query || 'musicVideo'}&media=musicVideo&limit=${limit}`;
    const data = await this._fetch(url, 'Error fetching videos:');
    return data.results || [];
  },

  // Radio
  async fetchRadioStations(query = '', limit = 20) {
    const url = query
      ? `${API_ENDPOINTS.RADIO_BROWSER}search?name=${query}&limit=${limit}`
      : `${API_ENDPOINTS.RADIO_BROWSER}topvote/${limit}`;
    return await this._fetch(url, 'Error fetching radio stations:') || [];
  },

  // Podcasts
  async fetchPodcasts(query = '', limit = 20) {
    const url = `${API_ENDPOINTS.ITUNES_SEARCH}?term=${query || 'podcast'}&media=podcast&limit=${limit}`;
    const data = await this._fetch(url, 'Error fetching podcasts:');
    return data.results || [];
  },

  // Images
  async fetchImages(query = '', limit = 20) {
    const url = `${API_ENDPOINTS.PICSUM_PHOTOS}?page=1&limit=${limit}`;
    return await this._fetch(url, 'Error fetching images:') || [];
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
