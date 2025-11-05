import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PlayerProvider } from './contexts/PlayerContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Page from './components/Page';

function App() {
  return (
    <PlayerProvider>
      <FavoritesProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:type" element={<Page />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </Router>
      </FavoritesProvider>
    </PlayerProvider>
  );
}

export default App;
