import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Music from './pages/Music';
import Videos from './pages/Videos';
import Radio from './pages/Radio';
import Podcasts from './pages/Podcasts';
import Images from './pages/Images';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/music" element={<Music />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/radio" element={<Radio />} />
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/images" element={<Images />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
