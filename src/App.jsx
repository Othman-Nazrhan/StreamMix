import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PlayerProvider } from './contexts/PlayerContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Music from './pages/Music';
import Videos from './pages/Videos';
import Radio from './pages/Radio';
import Podcasts from './pages/Podcasts';
import Images from './pages/Images';

function App() {
  return (
    <PlayerProvider>
      <FavoritesProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/music" element={<Music />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/radio" element={<Radio />} />
              <Route path="/podcasts" element={<Podcasts />} />
              <Route path="/images" element={<Images />} />
            </Routes>
          </Layout>
        </Router>
      </FavoritesProvider>
    </PlayerProvider>
  );
}

export default App;
