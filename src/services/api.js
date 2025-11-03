// API configuration and service functions
const API_KEYS = {
  JAMENDO: 'YOUR_JAMENDO_CLIENT_ID',
  PEXELS: 'YOUR_PEXELS_API_KEY',
  UNSPLASH: 'YOUR_UNSPLASH_ACCESS_KEY'
};

const API_ENDPOINTS = {
  JAMENDO_TRACKS: 'https://api.jamendo.com/v3.0/tracks/',
  PEXELS_VIDEOS: 'https://api.pexels.com/videos/',
  PEXELS_VIDEOS_POPULAR: 'https://api.pexels.com/videos/popular',
  PEXELS_VIDEOS_SEARCH: 'https://api.pexels.com/videos/search',
  RADIO_BROWSER: 'https://de1.api.radio-browser.info/json/stations/',
  PODCAST_INDEX: 'https://podcastindex.org/api/search',
  UNSPLASH_PHOTOS: 'https://api.unsplash.com/photos/random',
  UNSPLASH_SEARCH: 'https://api.unsplash.com/search/photos'
};

export { API_KEYS, API_ENDPOINTS };
