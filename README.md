# StreamMix

A multimedia streaming platform built with React that allows users to discover and enjoy free music, videos, podcasts, radio stations, and images from various APIs.

## Features

- 🎵 **Music**: Stream free music from Jamendo API
- 🎬 **Videos**: Watch free videos from Pexels
- 📻 **Radio**: Listen to radio stations worldwide
- 🎙️ **Podcasts**: Discover free podcasts
- 🖼️ **Images**: Browse free stock photos from Unsplash
- 🔍 **Global Search**: Search across all content types
- ❤️ **Favorites**: Save your favorite content
- 🎧 **Integrated Player**: Play music, videos, and radio with controls

## Technologies Used

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Media Player**: React Player
- **State Management**: Zustand
- **Icons**: Lucide React

## APIs Used

- [Jamendo API](https://developer.jamendo.com/v3.0) - Music
- [Pexels API](https://www.pexels.com/api/) - Videos
- [Radio Browser API](https://www.radio-browser.info/) - Radio stations
- [Podcast Index API](https://podcastindex.org/api) - Podcasts
- [Unsplash API](https://unsplash.com/developers) - Images

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd StreamMix
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get API Keys**
   - Sign up for API keys from the services listed above
   - Create a `.env` file in the root directory

4. **Configure Environment Variables**
   Create a `.env` file with your API keys:
   ```
   VITE_JAMENDO_CLIENT_ID=your_jamendo_client_id
   VITE_PEXELS_API_KEY=your_pexels_api_key
   VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
   ```

5. **Update API Calls**
   Replace placeholder API keys in the code with environment variables:
   - In `src/pages/Music.jsx`: Replace `YOUR_JAMENDO_CLIENT_ID` with `import.meta.env.VITE_JAMENDO_CLIENT_ID`
   - In `src/pages/Videos.jsx`: Replace `YOUR_PEXELS_API_KEY` with `import.meta.env.VITE_PEXELS_API_KEY`
   - In `src/pages/Images.jsx`: Replace `YOUR_UNSPLASH_ACCESS_KEY` with `import.meta.env.VITE_UNSPLASH_ACCESS_KEY`

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
StreamMix/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Player.jsx
│   │   ├── ContentCard.jsx
│   │   └── SearchBar.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Music.jsx
│   │   ├── Videos.jsx
│   │   ├── Radio.jsx
│   │   ├── Podcasts.jsx
│   │   └── Images.jsx
│   ├── hooks/
│   │   └── useFetch.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── index.html
```

## Features Overview

### Home Page
- Mixed content from all APIs
- Global search functionality
- Featured content carousel

### Individual Pages
Each page (Music, Videos, Radio, Podcasts, Images) includes:
- Content grid display
- Search functionality
- Favorite button
- Integrated media player (except Images)

### Player Component
- Play/pause controls
- Volume control
- Next/previous track buttons
- Supports audio and video playback

### Favorites
- Stored in localStorage
- Accessible across sessions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Disclaimer

This application uses various third-party APIs. Please ensure you comply with their terms of service and usage limits. Some APIs may require authentication or have rate limits.
