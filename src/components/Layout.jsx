import Navbar from './Navbar';
import Player from './Player';

// Layout component that wraps all pages
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <Player />
    </div>
  );
};

export default Layout;
