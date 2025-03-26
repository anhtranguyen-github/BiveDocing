import { create } from 'zustand';
import { Message, Model, EmbeddingModel, HealthStatus } from '../types';

interface AppState {
  messages: Message[];
  models: Model[];
  embeddingModels: EmbeddingModel[];
  selectedModel: string | null;
  selectedEmbeddingModel: string | null;
  healthStatus: HealthStatus;
  isDarkMode: boolean;
  addMessage: (message: Message) => void;
  setModels: (models: Model[]) => void;
  setEmbeddingModels: (models: EmbeddingModel[]) => void;
  setSelectedModel: (model: string) => void;
  setSelectedEmbeddingModel: (model: string) => void;
  setHealthStatus: (status: HealthStatus) => void;
  toggleDarkMode: () => void;
}

export const useStore = create<AppState>((set) => ({
  messages: [],
  models: [],
  embeddingModels: [],
  selectedModel: null,
  selectedEmbeddingModel: null,
  healthStatus: { ollama: false, qdrant: false },
  isDarkMode: false,
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setModels: (models) => set({ models }),
  setEmbeddingModels: (models) => set({ embeddingModels: models }),
  setSelectedModel: (model) => set({ selectedModel: model }),
  setSelectedEmbeddingModel: (model) => set({ selectedEmbeddingModel: model }),
  setHealthStatus: (status) => set({ healthStatus: status }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));