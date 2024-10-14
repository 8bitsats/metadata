import React from 'react';
import ApiKeyManager from './ApiKeyManager';
import MetadataComposer from './MetadataComposer';
import SolanaExplorer from './SolanaExplorer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-baseline">
          <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-green-400 animate-pulse glow-text">APEyes</h1>
          <h2 className="ml-4 text-sm text-purple-300 italic">made wif love by 8bit</h2>
        </div>
      </header>
      
      <div className="space-y-8">
        <ApiKeyManager />
        <MetadataComposer />
        <SolanaExplorer />
      </div>
    </div>
  );
};

export default App;