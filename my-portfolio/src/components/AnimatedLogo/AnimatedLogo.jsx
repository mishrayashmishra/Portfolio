import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function AnimatedLogo() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      {/* Background circle with subtle animation */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 shadow-lg"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ 
          scale: isLoaded ? 1 : 0, 
          rotate: isLoaded ? 0 : -180 
        }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          delay: 0.2 
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
        }}
      />
      
      {/* Decorative ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-gray-600"
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0, 
          scale: isLoaded ? 1 : 1.2 
        }}
        transition={{ 
          duration: 0.6, 
          delay: 0.5 
        }}
      />
      
      {/* Y Letter */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, x: -20, rotateY: -90 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0, 
          x: isLoaded ? -2 : -20,
          rotateY: isLoaded ? 0 : -90
        }}
        transition={{ 
          duration: 0.6, 
          delay: 0.7,
          ease: "easeOut"
        }}
      >
        <span className="text-white font-bold text-sm tracking-wider">Y</span>
      </motion.div>
      
      {/* M Letter */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, x: 20, rotateY: 90 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0, 
          x: isLoaded ? 2 : 20,
          rotateY: isLoaded ? 0 : 90
        }}
        transition={{ 
          duration: 0.6, 
          delay: 0.9,
          ease: "easeOut"
        }}
      >
        <span className="text-white font-bold text-sm tracking-wider">M</span>
      </motion.div>
      
      {/* Subtle continuous animation - floating effect */}
      <motion.div
        className="absolute inset-0"
        animate={{ 
          y: [0, -2, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      />
      
      {/* Sparkle effect on hover */}
      <motion.div
        className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full opacity-0"
        whileHover={{ 
          opacity: [0, 1, 0],
          scale: [1, 1.5, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 0.6,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}

export default AnimatedLogo;