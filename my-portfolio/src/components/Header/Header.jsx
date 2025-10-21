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
    // Close menu
    setIsOpen(false);
    
    // Use requestAnimationFrame to ensure React has updated
    requestAnimationFrame(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        
        // Adjust for fixed header
        setTimeout(() => {
          window.scrollBy({
            top: -80,
            behavior: 'smooth'
          });
        }, 50);
      }
    });
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
          <div className="md:hidden ml-auto z-50">
            <button 
              onClick={toggleNavbar} 
              className="text-white hover:text-gray-300 transition-colors duration-200 p-2 relative z-50"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navbar Menu - Fixed positioning */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setIsOpen(false)}
              />
              
              {/* Dropdown Menu */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="fixed left-0 right-0 top-[60px] mx-4 bg-gradient-to-b from-gray-900 to-black rounded-2xl shadow-2xl border border-white/10 z-40 md:hidden overflow-hidden"
              >
                <motion.ul
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.07, delayChildren: 0.1 }
                    },
                    closed: {
                      transition: { staggerChildren: 0.05, staggerDirection: -1 }
                    }
                  }}
                  className="flex flex-col py-4"
                >
                  {navItems.map((item, index) => (
                    <motion.li 
                      key={item.id}
                      variants={{
                        open: {
                          y: 0,
                          opacity: 1,
                          transition: {
                            y: { stiffness: 1000, velocity: -100 }
                          }
                        },
                        closed: {
                          y: -20,
                          opacity: 0,
                          transition: {
                            y: { stiffness: 1000 }
                          }
                        }
                      }}
                      className="relative"
                    >
                      <button 
                        onClick={() => handleNavClick(item.id)} 
                        className="w-full text-center py-4 px-6 text-white text-lg font-medium hover:bg-white/5 transition-all duration-200 relative group"
                      >
                        <span className="relative z-10">{item.label}</span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.5 }}
                        />
                      </button>
                      {index < navItems.length - 1 && (
                        <div className="mx-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      )}
                    </motion.li>
                  ))}
                  
                  <motion.li
                    variants={{
                      open: {
                        y: 0,
                        opacity: 1,
                        transition: {
                          y: { stiffness: 1000, velocity: -100 }
                        }
                      },
                      closed: {
                        y: -20,
                        opacity: 0,
                        transition: {
                          y: { stiffness: 1000 }
                        }
                      }
                    }}
                    className="pt-4 pb-2 px-6"
                  >
                    <button
                      className="w-full bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                      onClick={() => {
                        setShowContactModal(true);
                        setIsOpen(false);
                      }}
                    >
                      CONTACT ME
                    </button>
                  </motion.li>
                </motion.ul>
              </motion.div>
            </>
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