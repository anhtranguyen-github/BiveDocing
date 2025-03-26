import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { useStore } from '../store';
import { api } from '../services/api';

const Settings = () => {
  const {
    models,
    embeddingModels,
    selectedModel,
    selectedEmbeddingModel,
    healthStatus,
    setModels,
    setEmbeddingModels,
    setSelectedModel,
    setSelectedEmbeddingModel,
    setHealthStatus,
    isDarkMode,
  } = useStore();

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const [modelsData, embeddingsData, healthData] = await Promise.all([
          api.getModels(),
          api.getEmbeddings(),
          api.getHealth(),
        ]);

        setModels(modelsData);
        setEmbeddingModels(embeddingsData);
        setHealthStatus(healthData);
      } catch (error) {
        console.error('Error fetching settings data:', error);
        setError('Failed to connect to the backend server. Please ensure the server is running and accessible.');
      }
    };

    fetchData();
  }, [setModels, setEmbeddingModels, setHealthStatus]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <div className={`rounded-lg shadow-lg p-6 ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'
      }`}>
        <h2 className="text-2xl font-bold mb-6">Settings</h2>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* System Health */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-3">System Health</h3>
            <div className="grid grid-cols-2 gap-4">
              <HealthIndicator
                label="Ollama"
                status={healthStatus.ollama}
                isDarkMode={isDarkMode}
              />
              <HealthIndicator
                label="Qdrant"
                status={healthStatus.qdrant}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>

          {/* Model Selection */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-3">Model Selection</h3>
            <select
              value={selectedModel || ''}
              onChange={(e) => setSelectedModel(e.target.value)}
              className={`w-full p-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-gray-700 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <option value="">Select a model</option>
              {models.map((model) => (
                <option key={model.name} value={model.name}>
                  {model.name} {model.isDefault ? '(Default)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Embedding Model Selection */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-3">Embedding Model</h3>
            <select
              value={selectedEmbeddingModel || ''}
              onChange={(e) => setSelectedEmbeddingModel(e.target.value)}
              className={`w-full p-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-gray-700 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <option value="">Select an embedding model</option>
              {embeddingModels.map((model) => (
                <option key={model.name} value={model.name}>
                  {model.name} {model.isDefault ? '(Default)' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const HealthIndicator = ({ 
  label, 
  status, 
  isDarkMode 
}: { 
  label: string; 
  status: boolean; 
  isDarkMode: boolean;
}) => (
  <div className={`p-4 rounded-lg ${
    isDarkMode 
      ? status ? 'bg-green-900/20' : 'bg-red-900/20'
      : status ? 'bg-green-100' : 'bg-red-100'
  }`}>
    <div className="flex items-center space-x-2">
      {status ? (
        <CheckCircle className="text-green-500" size={20} />
      ) : (
        <XCircle className="text-red-500" size={20} />
      )}
      <span className={status ? 'text-green-500' : 'text-red-500'}>
        {label}
      </span>
    </div>
  </div>
);

export default Settings;