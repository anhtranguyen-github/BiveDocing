import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Search } from 'lucide-react';
import { useStore } from '../store';
import { api } from '../services/api';

const Chat = () => {
  const [query, setQuery] = useState('');
  const [useWebSearch, setUseWebSearch] = useState(true);
  const { messages, addMessage, selectedModel } = useStore();
  const isDarkMode = useStore((state) => state.isDarkMode);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Add user message
    addMessage({ role: 'user', content: query });

    try {
      const response = await api.query({
        query,
        model_name: selectedModel || undefined,
        use_web_search: useWebSearch,
      });

      if (response.ok) {
        const data = await response.json();
        addMessage({ role: 'assistant', content: data.response });
      } else {
        addMessage({ 
          role: 'assistant', 
          content: 'Sorry, I encountered an error processing your request.' 
        });
      }
    } catch (error) {
      addMessage({ 
        role: 'assistant', 
        content: 'Sorry, there was an error connecting to the server.' 
      });
    }

    setQuery('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className={`rounded-lg shadow-lg p-6 ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}>
        <div className="space-y-4 mb-4 h-[60vh] overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                message.role === 'user'
                  ? isDarkMode 
                    ? 'bg-blue-600 ml-auto' 
                    : 'bg-blue-500 text-white ml-auto'
                  : isDarkMode
                    ? 'bg-gray-700'
                    : 'bg-gray-100'
              } max-w-[80%]`}
            >
              {message.content}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a question..."
              className={`w-full p-3 rounded-lg pr-10 ${
                isDarkMode 
                  ? 'bg-gray-700 text-white placeholder-gray-400' 
                  : 'bg-gray-100 text-gray-900 placeholder-gray-500'
              }`}
            />
            <button
              type="button"
              onClick={() => setUseWebSearch(!useWebSearch)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded ${
                useWebSearch 
                  ? isDarkMode ? 'text-blue-400' : 'text-blue-500' 
                  : isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <Search size={20} />
            </button>
          </div>
          <button
            type="submit"
            className={`p-3 rounded-lg ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Chat;