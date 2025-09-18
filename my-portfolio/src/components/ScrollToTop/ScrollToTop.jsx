import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    
    const toggleVisibility = () => {
      const scrolled = document.documentElement.scrollTop || document.body.scrollTop;
      const windowScrollY = window.scrollY;
      
      // Show button when user scrolls down 100px from top
      if (scrolled > 100 || windowScrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(toggleVisibility);
        ticking = true;
      }
    };

    // Multiple event listeners to catch scroll
    window.addEventListener('scroll', requestTick, { passive: true });
    document.addEventListener('scroll', requestTick, { passive: true });
    document.body.addEventListener('scroll', requestTick, { passive: true });

    // Check initial state
    toggleVisibility();

    return () => {
      window.removeEventListener('scroll', requestTick);
      document.removeEventListener('scroll', requestTick);
      document.body.removeEventListener('scroll', requestTick);
    };
  }, []);

  const scrollToTop = () => {
  console.log('ScrollToTop button clicked!'); // Debug log
  
  // Try to find and scroll to home section
  const homeSection = document.getElementById('home');
  if (homeSection) {
    console.log('Found home section, scrolling to it');
    homeSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  } else {
    console.log('Home section not found, trying window scroll');
    // Fallback to window scroll
    window.scrollTo(0, 0);
  }
};

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-white text-black p-4 rounded-full shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300 group cursor-pointer"
          aria-label="Scroll to top"
          style={{ 
            background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
            border: '1px solid rgba(0,0,0,0.1)'
          }}
        >
          <FaArrowUp 
            size={18} 
            className="transition-transform duration-300 group-hover:-translate-y-1" 
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default ScrollToTop;