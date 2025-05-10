import Image from "next/image";
import { useState, useRef, useEffect } from "react";

//components
import PartclesContainer from "../components/ParticlesContainer";
import ProjectsBtn from "../components/ProjectsBtn";
import Avatar from "../components/Avatar";
import { FaUser, FaPaperPlane, FaTimes } from "react-icons/fa";

// Import one of your new chat button components
import SVGAnimatedChatBtn from "../components/SVGAnimatedChatBtn";
// You can switch to any of the three options:
import AnimatedChatBtn from "../components/ChatBotBtn";
import FuturisticChatBtn from "../components/FuturisticChatBtn";

//framer-motion
import { motion, AnimatePresence } from "framer-motion";

//variants
import { fadeIn } from "../variants";

const Home = () => {
  const [chatOpen, setChatOpen] = useState(false);
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
  const [isMobile, setIsMobile] = useState(false);

  // Check if viewport is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      // Send message to API
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

  // Siri Wave Animation Icon
  const SiriWaveIcon = ({ isActive, size = 40 }) => {
    return (
      <div className={`siri-container ${isActive ? 'active' : ''}`} style={{ width: size, height: size }}>
        <div className="siri-wave">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-primary/60 h-full">
      {/* text  */}
      <div className="w-full h-full bg-gradient-to-r from-primary/10 via-black/30 to-black/10">
        <div className="text-center flex flex-col justify-center xl:pt-40 xl:text-left h-full container mx-auto">
          {/* title  */}
          <motion.h1
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h1"
          >
            Turning Complexity <br /> Into{" "}
            <span className="text-accent">Elegance</span>
          </motion.h1>

          {/* subtitle  */}
          <motion.p
            variants={fadeIn("down", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16"
          >
            Coding is my canvas, and I paint with the palette of Full Stack
            Development and DevOps, creating masterpieces in the ever-evolving
            landscape of technology.
          </motion.p>

          {/* Buttons - Project + ChatBot side by side on XL screens */}
          <div className="flex justify-center xl:hidden relative">
            <ProjectsBtn />
          </div>
          <motion.div
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="hidden xl:flex"
          >
            <div className="flex items-center">
              <ProjectsBtn />
              {/* Replace the old button with the new SVG animated button */}
              <FuturisticChatBtn onClick={() => setChatOpen(!chatOpen)} />
            </div>
          </motion.div>
        </div>
      </div>
      {/* image */}
      <div className="w-[1200px] h-full absolute right-0 bottom-0">
        {/* bg image  */}
        <div className="bg-none xl:bg-explosion xl:bg-cover xl:bg-right xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0"></div>
        {/* particles  */}
        <PartclesContainer />

        {/* avatar iamge  */}
        <motion.div
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
          transition={{ duration: 1, ease: "easeInOut" }}
          className="w-full h-full max-w-[737px] max-h-[678px] absolute -bottom-32 lg:bottom-0 lg:right-[8%]"
        >
          <Avatar />
        </motion.div>
      </div>

      {/* Floating Chat Window */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`fixed z-40 flex flex-col overflow-hidden rounded-lg shadow-2xl border border-accent/20 ${
              isMobile 
                ? 'bottom-20 left-0 right-0 mx-4 h-[60vh]' // Mobile: full width with margins
                : 'bottom-24 left-8 w-full max-w-md h-[500px]' // Desktop: fixed width at left
            }`}
          >
            {/* Chat Messages */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 bg-[#0d0d20]/90 backdrop-blur-md scrollbar-thin scrollbar-thumb-accent scrollbar-track-gray-800"
              style={{ 
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
                    className={`inline-block max-w-[85%] p-3 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-r from-accent/80 to-red-700/80 backdrop-blur-sm text-white rounded-br-none' 
                        : 'bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm text-white rounded-bl-none border-l-2 border-accent'
                    }`}
                  >
                    <div className="flex items-start">
                      {message.role === 'assistant' && (
                        <div className="mr-2 mt-1 flex-shrink-0">
                          <SiriWaveIcon isActive={false} size={20} />
                        </div>
                      )}
                      <div className="text-sm md:text-base">{message.content}</div>
                      {message.role === 'user' && (
                        <FaUser className="ml-2 mt-1 text-white opacity-70 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="text-left mb-4">
                  <div className="inline-block bg-gray-800/90 backdrop-blur-sm text-white p-3 rounded-lg rounded-bl-none border-l-2 border-accent">
                    <div className="flex items-center">
                      <div className="mr-2 flex-shrink-0">
                        <SiriWaveIcon isActive={true} size={20} />
                      </div>
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
            <div className="border-t border-gray-700 p-2 bg-[#111236]/90 backdrop-blur-md">
              <form onSubmit={handleSubmit} className="flex">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Sparsh's skills, projects..."
                  className="flex-grow p-2 bg-gray-800/80 backdrop-blur-sm text-white border border-gray-700 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-accent text-sm"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-accent/90 to-red-700/90 hover:from-accent hover:to-red-700 text-white p-2 rounded-r-lg flex items-center justify-center disabled:opacity-50 transition-all duration-200"
                >
                  <FaPaperPlane className="text-sm" />
                </button>
              </form>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setChatOpen(false)}
              className="absolute top-2 right-2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              <FaTimes size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add styles for the chat UI and Siri animation */}
      <style jsx>{`
        .typing-indicator {
          display: flex;
          align-items: center;
        }
        .typing-indicator span {
          height: 6px;
          width: 6px;
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
          width: 6px;
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

        /* Siri Animation Styles */
        .siri-container {
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .siri-wave {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
        }

        .siri-wave span {
          display: block;
          height: 60%;
          width: 3px;
          margin: 0 1px;
          background: #e93232;
          border-radius: 3px;
          animation: none;
          transition: height 0.2s ease;
        }

        .siri-container.active .siri-wave span {
          animation: siri-wave 1.5s infinite ease-in-out;
        }

        .siri-wave span:nth-child(1) {
          animation-delay: 0s;
          height: 30%;
        }

        .siri-wave span:nth-child(2) {
          animation-delay: 0.2s;
          height: 60%;
        }

        .siri-wave span:nth-child(3) {
          animation-delay: 0.4s;
          height: 80%;
        }

        .siri-wave span:nth-child(4) {
          animation-delay: 0.6s;
          height: 60%;
        }

        .siri-wave span:nth-child(5) {
          animation-delay: 0.8s;
          height: 30%;
        }

        @keyframes siri-wave {
          0%, 40%, 100% {
            transform: scaleY(0.5);
          }
          20% {
            transform: scaleY(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;