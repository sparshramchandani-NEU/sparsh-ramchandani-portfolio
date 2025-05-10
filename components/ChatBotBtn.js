// ChatBotBtn.js
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const ChatBotBtn = ({ onClick }) => {
  const [rotation, setRotation] = useState(0);
  const [hovered, setHovered] = useState(false);
  const requestRef = useRef();
  
  // Animation for the pulsing effect
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  // Continuous rotation animation
  useEffect(() => {
    const animate = () => {
      setRotation(prev => (prev + 0.2) % 360);
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div
      className="cursor-pointer relative w-[185px] h-[185px] flex justify-center items-center group ml-4"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Outer animated circle */}
      <motion.div
        className="absolute w-full h-full rounded-full"
        animate={hovered ? "pulse" : ""}
        variants={pulseVariants}
      >
        <svg width="100%" height="100%" viewBox="0 0 200 200">
          {/* Gradient definition */}
          <defs>
            <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
            
            {/* Filter for glow effect */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Outer circle */}
          <circle 
            cx="100" 
            cy="100" 
            r="90" 
            fill="none" 
            stroke="url(#circleGradient)" 
            strokeWidth="2" 
            filter="url(#glow)"
          />
          
          {/* Rotating decorative elements */}
          <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: 'center' }}>
            <circle cx="100" cy="10" r="3" fill="#ef4444" />
            <circle cx="190" cy="100" r="3" fill="#ef4444" />
            <circle cx="100" cy="190" r="3" fill="#ef4444" />
            <circle cx="10" cy="100" r="3" fill="#ef4444" />
          </g>
          
          {/* Pulsing inner circle */}
          <circle 
            cx="100" 
            cy="100" 
            r="60" 
            fill="none" 
            stroke="url(#circleGradient)" 
            strokeWidth="2"
            strokeDasharray="10,5"
            filter="url(#glow)"
          />
        </svg>
      </motion.div>
      
      {/* Inner circle with ripple effect */}
      <div className="w-[120px] h-[120px] rounded-full border-2 border-accent flex justify-center items-center relative overflow-hidden">
        {/* Ripple effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-accent"
              initial={{ width: '30%', height: '30%', opacity: 0.8 }}
              animate={{ 
                width: '100%', 
                height: '100%', 
                opacity: 0,
                transition: { 
                  duration: 2, 
                  ease: "easeOut",
                  delay: i * 0.6,
                  repeat: Infinity
                }
              }}
            />
          ))}
        </div>
        
        {/* Center dot */}
        <motion.div 
          className="w-4 h-4 rounded-full bg-accent"
          animate={{ 
            scale: [1, 1.2, 1],
            transition: { duration: 1.5, repeat: Infinity }
          }}
        />
      </div>
      
      {/* Text */}
      <div className="absolute bottom-0 text-center bg-black/50 backdrop-blur-sm px-4 py-1 rounded-full">
        <div className="text-[12px] uppercase tracking-[1px] leading-none">
          ASK ME
        </div>
        <div className="font-primary tracking-[1px] text-white text-[20px] leading-none">
          Anything
        </div>
      </div>
    </div>
  );
};

export default ChatBotBtn;