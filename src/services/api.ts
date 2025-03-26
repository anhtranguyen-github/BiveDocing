const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = {
  async query(params: {
    query: string;
    model_name?: string;
    use_web_search?: boolean;
  }) {
    try {
      const response = await fetch(`${API_BASE_URL}/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      return response;
    } catch (error) {
      console.error('Query API error:', error);
      throw error;
    }
  },

  async upload(file: File, config: {
    chunk_size?: number;
    chunk_overlap?: number;
    embedding_model?: string;
  }) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      Object.entries(config).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });
      return response;
    } catch (error) {
      console.error('Upload API error:', error);
      throw error;
    }
  },

  async getModels() {
    try {
      const response = await fetch(`${API_BASE_URL}/models`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Get models API error:', error);
      return [];
    }
  },

  async getEmbeddings() {
    try {
      const response = await fetch(`${API_BASE_URL}/embeddings`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Get embeddings API error:', error);
      return [];
    }
  },

  async getHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Health check API error:', error);
      return { ollama: false, qdrant: false, message: 'Failed to connect to backend' };
    }
  },
};