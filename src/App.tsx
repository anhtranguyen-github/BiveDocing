import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import Upload from './components/Upload';
import Settings from './components/Settings';
import { useStore } from './store';

function App() {
  const isDarkMode = useStore((state) => state.isDarkMode);

  return (
    <Router>
      <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Chat />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

export default App;