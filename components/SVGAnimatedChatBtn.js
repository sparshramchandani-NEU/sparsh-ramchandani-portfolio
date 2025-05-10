// SVGAnimatedChatBtn.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SVGAnimatedChatBtn = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className="cursor-pointer relative w-[185px] h-[185px] flex justify-center items-center group ml-4"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute w-full h-full">
        <svg width="100%" height="100%" viewBox="0 0 185 185">
          <defs>
            {/* Gradient for the circles */}
            <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
            
            {/* Glowing filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            {/* Clip path for revealing animation */}
            <clipPath id="circleClip">
              <circle cx="92.5" cy="92.5" r="90" />
            </clipPath>
          </defs>
          
          {/* Background glow */}
          <circle 
            cx="92.5" 
            cy="92.5" 
            r="88" 
            fill="rgba(239, 68, 68, 0.1)" 
            filter="url(#glow)" 
          />
          
          {/* Outer circle with dash animation */}
          <circle 
            cx="92.5" 
            cy="92.5" 
            r="88" 
            fill="none" 
            stroke="url(#circleGradient)" 
            strokeWidth="2"
            strokeDasharray="560"
            strokeDashoffset="0"
            filter="url(#glow)"
          >
            <animate 
              attributeName="stroke-dashoffset" 
              from="560" 
              to="0" 
              dur="15s" 
              repeatCount="indefinite" 
            />
            <animateTransform 
              attributeName="transform"
              type="rotate"
              from="0 92.5 92.5"
              to="360 92.5 92.5"
              dur="20s"
              repeatCount="indefinite"
            />
          </circle>
          
          {/* Middle circle */}
          <circle 
            cx="92.5" 
            cy="92.5" 
            r="70" 
            fill="none" 
            stroke="url(#circleGradient)" 
            strokeWidth="1.5"
            filter="url(#glow)"
          >
            <animate 
              attributeName="r" 
              values="70;72;70" 
              dur="3s" 
              repeatCount="indefinite" 
            />
          </circle>
          
          {/* Inner circle */}
          <circle 
            cx="92.5" 
            cy="92.5" 
            r="60" 
            fill="none" 
            stroke="url(#circleGradient)" 
            strokeWidth="1.5"
            filter="url(#glow)"
          />
          
          {/* Animated particle dots along the circle */}
          <g clipPath="url(#circleClip)">
            {[...Array(8)].map((_, i) => {
              const angle = (i * 45) * Math.PI / 180;
              const x = 92.5 + 70 * Math.cos(angle);
              const y = 92.5 + 70 * Math.sin(angle);
              
              return (
                <circle 
                  key={i} 
                  cx={x} 
                  cy={y} 
                  r="2" 
                  fill="#ef4444"
                  filter="url(#glow)"
                >
                  <animate 
                    attributeName="r" 
                    values="2;3;2" 
                    dur="2s" 
                    begin={`${i * 0.25}s`}
                    repeatCount="indefinite" 
                  />
                  <animate 
                    attributeName="opacity" 
                    values="1;0.5;1" 
                    dur="3s" 
                    begin={`${i * 0.5}s`}
                    repeatCount="indefinite" 
                  />
                </circle>
              );
            })}
          </g>
          
          {/* Animated lines connecting center to outer circle */}
          {[...Array(4)].map((_, i) => {
            const angle = (i * 90) * Math.PI / 180;
            const outerX = 92.5 + 88 * Math.cos(angle);
            const outerY = 92.5 + 88 * Math.sin(angle);
            
            return (
              <line 
                key={i}
                x1="92.5" 
                y1="92.5" 
                x2={outerX} 
                y2={outerY} 
                stroke="rgba(239, 68, 68, 0.4)" 
                strokeWidth="1"
              >
                <animate 
                  attributeName="opacity" 
                  values="0.4;0.8;0.4" 
                  dur="3s" 
                  begin={`${i * 0.75}s`}
                  repeatCount="indefinite" 
                />
              </line>
            );
          })}
          
          {/* Digital circuit-like patterns */}
          <path 
            d="M92.5,32.5 Q107.5,47.5 122.5,32.5 Q137.5,17.5 152.5,32.5"
            fill="none"
            stroke="rgba(239, 68, 68, 0.5)"
            strokeWidth="1"
            strokeDasharray="5,3"
          >
            <animateTransform 
              attributeName="transform"
              type="rotate"
              from="0 92.5 92.5"
              to="360 92.5 92.5"
              dur="30s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
      
      {/* Inner circle with AI icon */}
      <motion.div 
        className="relative w-[120px] h-[120px] rounded-full flex justify-center items-center bg-black/40 backdrop-blur-md z-10 border border-accent/50"
        animate={{
          boxShadow: isHovered 
            ? '0 0 15px 5px rgba(239, 68, 68, 0.5)' 
            : '0 0 8px 2px rgba(239, 68, 68, 0.3)'
        }}
      >
        {/* Animated wave circles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-full rounded-full border border-accent/30"
            initial={{ scale: 0.6, opacity: 0.8 }}
            animate={{ 
              scale: 1, 
              opacity: 0,
              transition: { 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.6 
              }
            }}
          />
        ))}
        
        {/* AI Text with glow */}
        <motion.div 
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-red-700"
          style={{ 
            textShadow: '0 0 10px rgba(239, 68, 68, 0.7)' 
          }}
          animate={{ 
            scale: [1, 1.1, 1],
            transition: { 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z" 
              fill="url(#circleGradient)"
            />
          </svg>
        </motion.div>
      </motion.div>
      
      {/* Text overlay */}
      
    </div>
  );
};

export default SVGAnimatedChatBtn;