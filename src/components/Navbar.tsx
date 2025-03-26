import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, Upload as UploadIcon, Settings as SettingsIcon, Sun, Moon } from 'lucide-react';
import { useStore } from '../store';

const Navbar = () => {
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useStore();

  return (
    <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <MessageSquare className={`h-6 w-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>RAG Chat</span>
            </Link>
            
            <div className="flex space-x-4">
              <NavLink to="/" icon={<MessageSquare />} label="Chat" isActive={location.pathname === '/'} />
              <NavLink to="/upload" icon={<UploadIcon />} label="Upload" isActive={location.pathname === '/upload'} />
              <NavLink to="/settings" icon={<SettingsIcon />} label="Settings" isActive={location.pathname === '/settings'} />
            </div>
          </div>
          
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            {isDarkMode ? <Sun className="text-white" /> : <Moon className="text-gray-900" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, label, isActive }: { to: string; icon: React.ReactNode; label: string; isActive: boolean }) => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  
  return (
    <Link to={to} className="relative">
      <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
        isDarkMode 
          ? (isActive ? 'text-white bg-gray-700' : 'text-gray-300 hover:text-white hover:bg-gray-700') 
          : (isActive ? 'text-gray-900 bg-gray-100' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100')
      }`}>
        {icon}
        <span>{label}</span>
      </div>
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
          initial={false}
        />
      )}
    </Link>
  );
};

export default Navbar;