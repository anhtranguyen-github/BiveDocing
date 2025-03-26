import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload as UploadIcon, X } from 'lucide-react';
import { useStore } from '../store';
import { api } from '../services/api';

const Upload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const isDarkMode = useStore((state) => state.isDarkMode);
  const selectedEmbeddingModel = useStore((state) => state.selectedEmbeddingModel);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await api.upload(acceptedFiles[0], {
        chunk_size: 1000,
        chunk_overlap: 200,
        embedding_model: selectedEmbeddingModel || undefined,
      });

      if (response.ok) {
        setSuccess('File uploaded and processed successfully!');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to upload file');
      }
    } catch (err) {
      setError('Error connecting to server');
    } finally {
      setUploading(false);
    }
  }, [selectedEmbeddingModel]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <div
        {...getRootProps()}
        className={`p-8 rounded-lg shadow-lg text-center cursor-pointer transition-colors ${
          isDarkMode 
            ? 'bg-gray-800 border-2 border-dashed border-gray-600' 
            : 'bg-white border-2 border-dashed border-gray-300'
        } ${isDragActive ? 'border-blue-500' : ''}`}
      >
        <input {...getInputProps()} />
        <UploadIcon 
          className={`mx-auto mb-4 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`} 
          size={48} 
        />
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
          {isDragActive
            ? 'Drop the file here...'
            : 'Drag and drop a file here, or click to select a file'}
        </p>
        <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Supported formats: .txt, .pdf, .doc, .docx
        </p>
      </div>

      {(error || success || uploading) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 p-4 rounded-lg ${
            error 
              ? 'bg-red-100 text-red-700' 
              : success 
                ? 'bg-green-100 text-green-700' 
                : 'bg-blue-100 text-blue-700'
          }`}
        >
          {error && (
            <div className="flex items-center">
              <X className="mr-2" size={20} />
              {error}
            </div>
          )}
          {success && success}
          {uploading && 'Uploading and processing file...'}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Upload;