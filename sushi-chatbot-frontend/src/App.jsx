import React, { useState } from 'react';
import Chatbot from './components/Chatbot';

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Sushi Chatbot</h1>
        <button
          onClick={toggleChat}
          className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded shadow-lg hover:bg-yellow-500 transition"
        >
          {isChatOpen ? 'Cerrar Chat' : 'Abrir Chat'}
        </button>

        {isChatOpen && <Chatbot />}
      </div>
    </div>
  );
};

export default App;
