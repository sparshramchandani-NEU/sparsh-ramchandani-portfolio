// FuturisticChatBtn.js
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const FuturisticChatBtn = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  // Canvas animation for particle effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = 185;
      canvas.height = 185;
    };
    
    setCanvasSize();
    
    // Particle class
    class Particle {
      constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = (Math.random() - 0.5) * 1;
        this.color = '#ef4444';
        this.radius = Math.random() * 50 + 20; // Orbit radius
        this.angle = Math.random() * Math.PI * 2; // Random starting angle
        this.angleSpeed = Math.random() * 0.02 + 0.01; // Speed of orbit
        this.oscillationSpeed = 0.02; // Speed of size oscillation
        this.oscillationAngle = 0; // Starting angle for size oscillation
      }
      
      update() {
        // Update angle for circular motion
        this.angle += this.angleSpeed;
        
        // Calculate position based on circular motion
        this.x = canvas.width / 2 + Math.cos(this.angle) * this.radius;
        this.y = canvas.height / 2 + Math.sin(this.angle) * this.radius;
        
        // Size oscillation
        this.oscillationAngle += this.oscillationSpeed;
        this.size = Math.abs(Math.sin(this.oscillationAngle)) * 3 + 1;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
    
    // Initialize particles
    const init = () => {
      for (let i = 0; i < 20; i++) {
        particles.push(new Particle());
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw center circle
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 60, 0, Math.PI * 2);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw outer circle
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 90, 0, Math.PI * 2);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    init();
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);
  
  return (
    <div 
      className="cursor-pointer relative w-[185px] h-[185px] flex justify-center items-center group ml-4"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Canvas animation */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0"
      />
      
      {/* Inner content */}
      <motion.div 
        className="w-[120px] h-[120px] rounded-full flex justify-center items-center z-10 bg-black/30 backdrop-blur-sm"
        animate={{
          boxShadow: isHovered 
            ? '0 0 15px 5px rgba(239, 68, 68, 0.6)' 
            : '0 0 10px 2px rgba(239, 68, 68, 0.3)'
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-accent text-4xl font-bold"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          AI
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FuturisticChatBtn;