'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaUser, FaPaperPlane } from 'react-icons/fa';

export default function SiriPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'What would you like to know about Sparsh?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = { role: 'user', content: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Send message to API - FIXED ENDPOINT PATH
      const response = await fetch('/api/chatbot/routes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        console.error('Error:', response.statusText);
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      // Add assistant response to chat
      setMessages(prevMessages => [
        ...prevMessages, 
        { role: 'assistant', content: data.response }
      ]);
    } catch (error) {
      console.error('Error:', error);
      // Add error message
      setMessages(prevMessages => [
        ...prevMessages, 
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ 
      background: 'linear-gradient(to right, #0f0c29, #111236, #1a1b47)',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed'
    }}>
      {/* Elegant Title - Matches your main page style */}
      <div className="max-w-5xl mx-auto px-4 pt-8 pb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
          Siri <span className="text-red-500">Assistant</span>
        </h2>
        <p className="text-gray-300 mb-8">
          Ask me anything about Sparsh's skills, experience, or projects
        </p>
      </div>
      
      {/* Chat Interface */}
      <div className="max-w-3xl mx-auto w-full px-4 pb-16 flex-1 flex flex-col">
        <div className="bg-[#111236] bg-opacity-80 rounded-lg shadow-lg overflow-hidden border border-gray-700 flex flex-col" style={{ height: '60vh' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white p-4 border-b border-gray-700">
            <h1 className="text-xl font-bold flex items-center">
              <FaRobot className="mr-2 text-red-500" /> Siri
            </h1>
            <p className="text-sm opacity-80">Turning conversations into insights</p>
          </div>
          
          {/* Chat Messages - FIXED SCROLLING */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 bg-[#0d0d20] bg-opacity-80 scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-800"
            style={{ 
              maxHeight: 'calc(60vh - 140px)', 
              overflowY: 'auto', 
              overscrollBehavior: 'contain',
              scrollbarWidth: 'thin',
              scrollbarColor: '#ef4444 #1f2937'
            }}
          >
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div 
                  className={`inline-block max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white rounded-br-none' 
                      : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-bl-none border-l-2 border-red-500'
                  }`}
                >
                  <div className="flex items-start">
                    {message.role === 'assistant' && (
                      <FaRobot className="mr-2 mt-1 text-red-500 flex-shrink-0" />
                    )}
                    <div>{message.content}</div>
                    {message.role === 'user' && (
                      <FaUser className="ml-2 mt-1 text-white opacity-70 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-left mb-4">
                <div className="inline-block bg-gray-800 text-white p-3 rounded-lg rounded-bl-none border-l-2 border-red-500">
                  <div className="flex items-center">
                    <FaRobot className="mr-2 text-red-500 flex-shrink-0" />
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Form */}
          <div className="border-t border-gray-700 p-4 bg-[#111236]">
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me about Sparsh's skills, projects, or experience..."
                className="flex-grow p-3 bg-gray-800 text-white border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-3 rounded-r-lg flex items-center justify-center disabled:opacity-50 transition-all duration-200"
              >
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Add some CSS for scrollbar styling, typing indicator and animated background */}
      <style jsx>{`
        .typing-indicator {
          display: flex;
          align-items: center;
        }
        .typing-indicator span {
          height: 8px;
          width: 8px;
          margin: 0 2px;
          background-color: #e93232;
          border-radius: 50%;
          display: inline-block;
          animation: bounce 1.4s infinite ease-in-out;
        }
        .typing-indicator span:nth-child(1) {
          animation-delay: -0.32s;
        }
        .typing-indicator span:nth-child(2) {
          animation-delay: -0.16s;
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }
        
        /* Custom scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #ef4444;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #b91c1c;
        }
      `}</style>
    </div>
  );
}