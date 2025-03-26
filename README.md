# RAG Chat Application

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with:
```
VITE_API_URL=http://localhost:8000
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Important Notes

- This is a frontend application that requires a backend server running on port 8000
- Make sure your backend server implements these endpoints:
  - `/query` - For chat queries
  - `/upload` - For document uploads
  - `/models` - For available models
  - `/embeddings` - For embedding models
  - `/health` - For system health status

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build