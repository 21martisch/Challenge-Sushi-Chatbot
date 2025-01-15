import React, { useState } from 'react';
import Chatbot from './components/Chatbot/Chatbot';
import SushiDesign from './components/SushiDesign/SushiDesign';
import sushiCalifornia from '../public/img/californiaRoll.png';
import sakeNigiri from '../public/img/sakeNigiri.png';
import CocaCola from '../public/img/coca-cola.png';
import chatbotIcon from '../public/img/botSushi.png'; 

const App = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <div className="min-h-screen bg-[#f4efe9] text-gray-800 relative">
      <header className="bg-[#8ec3b0] py-20 flex justify-evenly items-center">
        <h1 className="font-caveat text-4xl text-[#333]">RITCHI SUSHI</h1>
        <SushiDesign />
      </header>

      <section className="p-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="menu-item flex flex-col justify-between items-center bg-white rounded-lg shadow-lg p-4 hover:scale-105 transition-transform h-full">
            <img
              src={sushiCalifornia}
              alt="California Roll"
              className="w-32 mb-4"
            />
            <p className="text-lg font-medium mt-auto">California Roll</p>
          </div>
          <div className="menu-item flex flex-col justify-between items-center bg-white rounded-lg shadow-lg p-4 hover:scale-105 transition-transform h-full">
            <img
              src={sakeNigiri}
              alt="Sake Nigiri"
              className="w-32 mb-4"
            />
            <p className="text-lg font-medium mt-auto">Sake Nigiri</p>
          </div>
          <div className="menu-item flex flex-col justify-between items-center bg-white rounded-lg shadow-lg p-4 hover:scale-105 transition-transform h-full">
            <img
              src={CocaCola}
              alt="Coca-Cola"
              className="w-32 mb-4"
            />
            <p className="text-lg font-medium mt-auto">Coca-Cola</p>
          </div>
        </div>
      </section>

      {isChatbotOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white w-96 h-96 rounded-lg shadow-lg">
            <Chatbot />
            <button
              onClick={toggleChatbot}
              className="absolute top-4 right-4 text-2xl text-gray-600"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center">
        <div className="bg-white text-black text-sm p-2 rounded-md shadow-md mb-2 animate-fade-in">
          Aquí puedes hacer tu pedido
        </div>
        <button
          onClick={toggleChatbot}
          className="w-20 h-20 bg-black rounded-full flex justify-center items-center shadow-lg"
        >
          <img src={chatbotIcon} alt="Chatbot Icon" className="w-12 h-12" />
        </button>
      </div>
    </div>
  );
};

export default App;