import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import { BiSend } from "react-icons/bi";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hola 👋 Bienvenido a nuestro Sushi Chatbot.' },
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
      const userMessage = { id: messages.length + 1, text: `💬 ${inputValue}` };
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

        const botMessage = { id: messages.length + 2, text: `🍣 ${response.data.reply}` };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        const errorMessage = { id: messages.length + 2, text: '⚠️ Hubo un error al procesar tu mensaje. Intenta nuevamente.' };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-gradient-to-br from-gray-800 to-gray-600 rounded-lg shadow-lg text-white p-4">
      <div className="flex flex-col h-[500px]">
        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto bg-gray-100 text-black p-4 space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`p-3 rounded-lg ${message.id % 2 === 0 ? 'bg-gray-300 text-black' : 'bg-blue-500 text-white self-end'}`}
              >
                
                {message.text.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            ))}
            {loading && <div className="p-3 rounded-lg bg-gray-300 text-black">Escribiendo...</div>}
          </div>

        <div className="flex items-center bg-gray-700 p-4 rounded-b-lg">
          <input
            type="text"
            placeholder="Escribe tu mensaje... 🖊"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 p-2 mr-2 rounded-lg bg-gray-200 text-black focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-blue-600"
          >
            <BiSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
