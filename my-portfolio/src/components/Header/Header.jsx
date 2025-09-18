import { useRef, useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ContactModal from '../ContactModal/ContactModal';
import AnimatedLogo from '../AnimatedLogo/AnimatedLogo';

function Header() {
  const [navbar, setNavbar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const contactBtnRef = useRef(null);
  const navRef = useRef(null);

  // Navigation items for easier management
  const navItems = [
    { id: 'about', label: 'About me' },
    { id: 'skills', label: 'Skills' },
    { id: 'portfolio', label: 'Portfolio' }
  ];

  // Main scroll detection effect
  useEffect(() => {
    let ticking = false;
    
    const changeBackground = () => {
      const scrolled = document.documentElement.scrollTop || document.body.scrollTop;
      
      if (scrolled >= 50) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(changeBackground);
        ticking = true;
      }
    };

    // Event listeners
    window.addEventListener('scroll', requestTick, { passive: true });
    document.addEventListener('scroll', requestTick, { passive: true });
    document.body.addEventListener('scroll', requestTick, { passive: true });

    // Check initial state
    changeBackground();

    return () => {
      window.removeEventListener('scroll', requestTick);
      document.removeEventListener('scroll', requestTick);
      document.body.removeEventListener('scroll', requestTick);
    };
  }, []);

  const toggleNavbar = () => setIsOpen(!isOpen);

  const handleContactBtnClick = (e) => {
    e.preventDefault(); 
    e.stopPropagation();   
  setShowContactModal((prev) => !prev);
};

  const handleNavClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      <header className={navbar ? 'navbar active' : 'navbar'}>
        <div className="max-w-screen-xl mx-auto px-4 flex items-center w-full">
          {/* Animated Logo - Left Side */}
          <div className="flex-shrink-0">
            <AnimatedLogo />
          </div>
          
          {/* Desktop Navbar */}
          <nav className="hidden md:flex flex-1 justify-end items-center space-x-8 text-white relative">
            {navItems.map((item, index) => (
              <div key={item.id} className="relative">
                <button 
                  onClick={() => handleNavClick(item.id)} 
                  className="bg-transparent px-3 py-2 transition-all duration-300 relative text-white/70 hover:text-white"
                >
                  {item.label}
                </button>
              </div>
            ))}
            
            <button
              ref={contactBtnRef}
              className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors duration-200 font-medium ml-4"
              onClick={handleContactBtnClick}
            >
              CONTACT ME
            </button>
          </nav>
          
          {/* Mobile Navbar Toggle */}
          <div className="md:hidden ml-auto">
            <button 
              onClick={toggleNavbar} 
              className="text-white hover:text-gray-300 transition-colors duration-200 p-2"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navbar Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-black/95 text-white md:hidden backdrop-blur-sm"
            >
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="flex flex-col items-center space-y-4 py-6"
              >
                {navItems.map((item) => (
                  <li key={item.id} className="relative">
                    <button 
                      onClick={() => handleNavClick(item.id)} 
                      className="transition-colors duration-200 text-lg relative text-white hover:text-gray-300"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
                <li className="pt-2">
                  <button
                    className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors duration-200 font-medium"
                    onClick={() => {
                      setShowContactModal(true);
                      setIsOpen(false);
                    }}
                  >
                    CONTACT ME
                  </button>
                </li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        anchorRef={contactBtnRef}
        setIsOpen={setShowContactModal}
      />
    </>
  );
}

export default Header;