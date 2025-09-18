import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function PageLoader({ onLoadingComplete }) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [resourcesLoaded, setResourcesLoaded] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  const loadingTexts = [
    'Initializing...',
    'Loading Portfolio...',
    'Preparing Experience...',
    'Almost Ready...'
  ];

  useEffect(() => {
    let progressInterval;
    let textInterval;
    
    // Simple time-based loading (no content detection)
    const startLoading = () => {
      // Set loading duration (3 seconds total)
      setTimeout(() => {
        setMinTimeElapsed(true);
      }, 2500);

      // Simulate resource loading completion after 2.8 seconds
      setTimeout(() => {
        setResourcesLoaded(true);
      }, 2300);
    };

    // Simple progress simulation
    const startProgressSimulation = () => {
      let progress = 0;
      
      progressInterval = setInterval(() => {
        // Smooth and consistent progress
        let increment;
        if (progress < 30) increment = 3;
        else if (progress < 60) increment = 2.5;
        else if (progress < 85) increment = 2;
        else increment = 1;

        progress += increment;
        
        // Cap at 100%
        if (progress >= 100) {
          progress = 100;
          clearInterval(progressInterval);
        }
        
        setLoadingProgress(progress);
      }, 80);
    };

    // Text update logic
    const startTextUpdates = () => {
      textInterval = setInterval(() => {
        setLoadingProgress(current => {
          if (current < 25) setCurrentText(loadingTexts[0]);
          else if (current < 50) setCurrentText(loadingTexts[1]);
          else if (current < 80) setCurrentText(loadingTexts[2]);
          else setCurrentText(loadingTexts[3]);
          return current;
        });
      }, 120);
    };

    // Start simple time-based loading
    startLoading();
    startProgressSimulation();
    startTextUpdates();

    return () => {
      if (progressInterval) clearInterval(progressInterval);
      if (textInterval) clearInterval(textInterval);
    };
  }, []);

  // Complete loading when conditions are met
  useEffect(() => {
    if (resourcesLoaded && minTimeElapsed && loadingProgress >= 100) {
      setTimeout(() => {
        setIsComplete(true);
        setTimeout(() => {
          onLoadingComplete();
        }, 500);
      }, 200);
    }
  }, [resourcesLoaded, minTimeElapsed, loadingProgress, onLoadingComplete]);

  // Enhanced Animated Logo Component
  const LoadingLogo = () => {
    return (
      <div className="relative w-32 h-32 flex items-center justify-center mb-8">
        {/* Outer glowing ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, #374151, #4b5563, #6b7280, #9ca3af, #374151)',
            filter: 'blur(1px)'
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1.1, 
            rotate: 360,
            opacity: 0.3
          }}
          transition={{ 
            scale: { duration: 0.8, ease: "easeOut" },
            rotate: { duration: 6, repeat: Infinity, ease: "linear" },
            opacity: { duration: 0.6 }
          }}
        />
        
        {/* Main background circle */}
        <motion.div
          className="absolute inset-3 rounded-full shadow-2xl"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #374151, #1f2937, #111827)',
            boxShadow: '0 0 30px rgba(55, 65, 81, 0.4), inset 0 0 15px rgba(0,0,0,0.2)'
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        
        {/* Inner ring */}
        <motion.div
          className="absolute inset-6 rounded-full border border-gray-600/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        />
        
        {/* Letters */}
        <div className="relative z-10 flex items-center justify-center">
          <motion.span
            className="text-4xl font-bold tracking-wider select-none text-white mr-1"
            style={{
              textShadow: '0 0 10px rgba(255, 255, 255, 0.3), 0 2px 4px rgba(0,0,0,0.3)',
              filter: 'drop-shadow(0 0 8px rgba(156, 163, 175, 0.4))'
            }}
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          >
            Y
          </motion.span>
          
          <motion.span
            className="text-4xl font-bold tracking-wider select-none text-white ml-1"
            style={{
              textShadow: '0 0 10px rgba(255, 255, 255, 0.3), 0 2px 4px rgba(0,0,0,0.3)',
              filter: 'drop-shadow(0 0 8px rgba(156, 163, 175, 0.4))'
            }}
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          >
            M
          </motion.span>
        </div>
        
        {/* Floating animation */}
        <motion.div
          className="absolute inset-0"
          animate={{ y: [0, -6, 0], rotate: [0, 1, 0, -1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        
        {/* Sparkles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gray-300 rounded-full"
            style={{
              top: `${30 + Math.random() * 40}%`,
              left: `${30 + Math.random() * 40}%`,
            }}
            animate={{ opacity: [0, 0.6, 0], scale: [0.8, 1, 0.8] }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              delay: 0.8 + Math.random() * 1,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <motion.div 
              className="absolute top-1/4 left-1/4 w-64 h-64 border border-white/20 rounded-full"
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity } }}
            />
            <motion.div 
              className="absolute bottom-1/4 right-1/4 w-32 h-32 border border-white/10 rounded-full"
              animate={{ rotate: -360, scale: [1, 1.2, 1] }}
              transition={{ rotate: { duration: 15, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity } }}
            />
            <motion.div 
              className="absolute top-1/2 right-1/3 w-48 h-48 border border-white/5 rounded-full"
              animate={{ rotate: 360, y: [-20, 20, -20] }}
              transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, y: { duration: 6, repeat: Infinity } }}
            />
          </div>

          {/* Main Content */}
          <div className="text-center space-y-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <LoadingLogo />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-gray-400 text-xl font-light tracking-wide"
              >
                Front-end Developer / UI Designer
              </motion.p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "320px", opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mx-auto"
            >
              <div className="w-full bg-gray-800/50 rounded-full h-3 mb-4 backdrop-blur-sm border border-gray-700/30">
                <motion.div
                  className="h-3 rounded-full relative overflow-hidden"
                  style={{ 
                    width: `${loadingProgress}%`,
                    background: 'linear-gradient(90deg, #374151, #4b5563, #6b7280, #9ca3af)'
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <motion.span
                  key={currentText}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-gray-400 font-light tracking-wide"
                >
                  {currentText}
                </motion.span>
                <span className="text-gray-300 font-mono text-base">
                  {Math.round(loadingProgress)}%
                </span>
              </div>
            </motion.div>

            {/* Loading Spinner */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 mx-auto border-2 border-t-gray-400 border-r-gray-600 border-b-gray-700 border-l-transparent rounded-full"
            />

            {/* Loading Dots */}
            <div className="flex justify-center space-x-3">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.4, 1, 0.4],
                    backgroundColor: ['#6b7280', '#9ca3af', '#6b7280']
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  className="w-4 h-4 rounded-full"
                />
              ))}
            </div>

            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PageLoader;