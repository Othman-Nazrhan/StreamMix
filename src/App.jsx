import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PlayerProvider } from './contexts/PlayerContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { VotesProvider } from './contexts/VotesContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Page from './components/Page';
import BattlePage from './pages/BattlePage';

function App() {
  return (
    <PlayerProvider>
      <FavoritesProvider>
        <VotesProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/battle" element={<BattlePage />} />
                <Route path="/:type" element={<Page />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </Router>
        </VotesProvider>
      </FavoritesProvider>
    </PlayerProvider>
  );
}

export default App;
