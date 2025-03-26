export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Model {
  name: string;
  description: string;
  isDefault: boolean;
}

export interface EmbeddingModel {
  name: string;
  description: string;
  isDefault: boolean;
}

export interface HealthStatus {
  ollama: boolean;
  qdrant: boolean;
  message?: string;
}

export interface UploadConfig {
  chunkSize: number;
  chunkOverlap: number;
  embeddingModel?: string;
}