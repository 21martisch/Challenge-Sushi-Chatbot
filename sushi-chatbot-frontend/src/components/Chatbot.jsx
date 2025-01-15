import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Chat iniciado. ¿En qué puedo ayudarte?' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedUserId = Cookies.get('userId');
    if (storedUserId) {
        setUserId(storedUserId);
    } else {
        const newUserId = uuidv4();
        Cookies.set('userId', newUserId, { expires: 365 });
        setUserId(newUserId);
    }
}, []);

   const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const userMessage = { id: messages.length + 1, text: inputValue };
      setMessages([...messages, userMessage]);
      setInputValue('');
      setLoading(true);
  
      try {
        const response = await axios.post('http://localhost:5000/chat', 
          { 
            message: userMessage.text, 
            userId
          },
          { withCredentials: true }
        );
  
        const botMessage = { id: messages.length + 2, text: response.data.reply };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        const errorMessage = { id: messages.length + 2, text: 'Hubo un error al procesar tu mensaje. Intenta nuevamente.' };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setLoading(false);
      }
    }
  };
  

  return (
    <div className="mt-6 p-4 bg-white text-black rounded shadow-lg max-w-md mx-auto animate-fade-in">
      <div className="h-64 overflow-y-auto border-b border-gray-300 mb-4 p-2">
        {messages.map((message) => (
          <p key={message.id} className="text-sm mb-2">{message.text}</p>
        ))}
        {loading && <p className="text-sm text-gray-500">Escribiendo...</p>}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
          disabled={loading}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chatbot;