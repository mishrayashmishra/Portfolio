import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  FaHtml5, 
  FaCss3Alt, 
  FaJsSquare, 
  FaReact, 
  FaNodeJs, 
  FaGitAlt, 
  FaGithub,
  FaServer,
  FaDatabase,
  FaCode,
  FaPalette,
  FaFire
} from 'react-icons/fa';

function Skills() {
  const [currentScrollIndex, setCurrentScrollIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isSwipeable, setIsSwipeable] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.3 });

  const iconMap = {
    "html5-plain": <FaHtml5 className="text-orange-500" size={48} />,
    "css3-plain": <FaCss3Alt className="text-blue-500" size={48} />,
    "javascript-plain": <FaJsSquare className="text-yellow-400" size={48} />,
    "react-original": <FaReact className="text-cyan-400" size={48} />,
    "nodejs-plain": <FaNodeJs className="text-green-600" size={48} />,
    "express-original": <FaServer className="text-gray-300" size={48} />,
    "mongodb-plain": <FaDatabase className="text-green-700" size={48} />,
    "firebase-plain": <FaFire className="text-yellow-500" size={48} />,
    "git-plain": <FaGitAlt className="text-orange-600" size={48} />,
    "github-original": <FaGithub className="text-white" size={48} />,
    "vscode-plain": <FaCode className="text-blue-400" size={48} />,
    "figma-plain": <FaPalette className="text-pink-500" size={48} />,
  };

  // Flattened skills array with category info
  const allSkills = [
    // Frontend (0-3)
    { name: "HTML5", icon: "html5-plain", category: "Frontend" },
    { name: "CSS3", icon: "css3-plain", category: "Frontend" },
    { name: "JavaScript", icon: "javascript-plain", category: "Frontend" },
    { name: "React", icon: "react-original", category: "Frontend" },
    // Backend (4-7)
    { name: "Node.js", icon: "nodejs-plain", category: "Backend" },
    { name: "Express", icon: "express-original", category: "Backend" },
    { name: "MongoDB", icon: "mongodb-plain", category: "Backend" },
    { name: "Firebase", icon: "firebase-plain", category: "Backend" },
    // Tools (8-11)
    { name: "Git", icon: "git-plain", category: "Tools" },
    { name: "GitHub", icon: "github-original", category: "Tools" },
    { name: "VS Code", icon: "vscode-plain", category: "Tools" },
    { name: "Figma", icon: "figma-plain", category: "Tools" },
  ];

  const cardsPerView = 3;
  const maxScrollIndex = Math.max(0, allSkills.length - cardsPerView);

  // Get current category based on leftmost visible card
  const getCurrentCategory = () => {
    return allSkills[currentScrollIndex]?.category || "Frontend";
  };

  // Auto-scroll functionality
  useEffect(() => {
    let scrollInterval;
    if (isHovering && isSwipeable) {
      scrollInterval = setInterval(() => {
        setCurrentScrollIndex(prev => {
          if (prev >= maxScrollIndex) return 0; // Loop back to start
          return prev + 1;
        });
      }, 2000); // Smooth scroll every 2 seconds
    }
    return () => {
      if (scrollInterval) clearInterval(scrollInterval);
    };
  }, [isHovering, isSwipeable, maxScrollIndex]);

  // Handle navigation
  const scrollNext = () => {
    setCurrentScrollIndex(prev => Math.min(prev + 1, maxScrollIndex));
  };

  const scrollPrev = () => {
    setCurrentScrollIndex(prev => Math.max(prev - 1, 0));
  };

  // Trigger animations when in view
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      // Enable carousel after animation completes
      setTimeout(() => {
        setIsSwipeable(true);
      }, 4000);
    }
  }, [isInView, hasAnimated]);

  // Magical Portal Component (for entrance animation)
  const MagicalPortal = ({ delay, children, index }) => {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={hasAnimated ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ 
          delay: delay,
          duration: 0.6,
          ease: "easeOut"
        }}
        className="absolute inset-0"
      >
        {/* Outer magical ring */}
        <motion.div
          initial={{ rotate: 0, scale: 0 }}
          animate={hasAnimated ? { 
            rotate: 360,
            scale: [0, 1.2, 1],
          } : { rotate: 0, scale: 0 }}
          transition={{
            delay: delay,
            duration: 1,
            ease: "easeOut",
            rotate: { duration: 2, ease: "linear" }
          }}
          className="absolute inset-0 rounded-xl border-2 border-amber-500/60"
          style={{
            background: 'conic-gradient(from 0deg, transparent, #f59e0b40, transparent)',
            boxShadow: '0 0 20px #f59e0b40, inset 0 0 20px #f59e0b20'
          }}
        />

        {/* Inner energy ring */}
        <motion.div
          initial={{ rotate: 0, scale: 0 }}
          animate={hasAnimated ? { 
            rotate: -180,
            scale: [0, 1.1, 1],
          } : { rotate: 0, scale: 0 }}
          transition={{
            delay: delay + 0.2,
            duration: 1.2,
            ease: "easeOut",
            rotate: { duration: 1.5, ease: "linear" }
          }}
          className="absolute inset-2 rounded-xl border border-orange-400/80"
          style={{
            background: 'radial-gradient(circle, #f59e0b10, transparent)',
            boxShadow: '0 0 15px #f59e0b60'
          }}
        />

        {/* Sparkle particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={hasAnimated ? {
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              x: [0, Math.cos(i * 60 * Math.PI / 180) * 40],
              y: [0, Math.sin(i * 60 * Math.PI / 180) * 40],
            } : { scale: 0, opacity: 0 }}
            transition={{
              delay: delay + 0.4,
              duration: 1,
              ease: "easeOut"
            }}
            className="absolute top-1/2 left-1/2 w-1 h-1 bg-amber-400 rounded-full"
            style={{
              boxShadow: '0 0 4px #f59e0b'
            }}
          />
        ))}

        {/* Card content */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotateY: 90 }}
          animate={hasAnimated ? { 
            scale: 1, 
            opacity: 1, 
            rotateY: 0 
          } : { scale: 0, opacity: 0, rotateY: 90 }}
          transition={{
            delay: delay + 0.8,
            duration: 0.6,
            ease: "easeOut"
          }}
          className="absolute inset-4 bg-gray-800 rounded-lg flex flex-col items-center justify-center text-center"
          style={{
            boxShadow: '0 8px 25px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    );
  };

  // Skill Card Component (for carousel)
  const SkillCard = ({ skill, index }) => (
    <motion.div
      className="flex-shrink-0 w-80 h-56 bg-gray-800 rounded-xl border border-gray-700/50 hover:border-amber-500/40 transition-all duration-300 mx-3"
      style={{
        boxShadow: '0 8px 25px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
      }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className="h-full flex flex-col items-center justify-center text-center p-6">
        <div className="w-20 h-20 mb-6 flex items-center justify-center">
          {iconMap[skill.icon]}
        </div>
        <h3 className="text-xl font-semibold text-gray-100 mb-2">{skill.name}</h3>
        <div className="w-12 h-0.5 bg-amber-500/60"></div>
      </div>
    </motion.div>
  );

  return (
    <section ref={sectionRef} id="skills" className="w-full py-20 bg-gray-900 overflow-hidden">
      <div className="w-full px-8 md:px-16 lg:px-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-16 text-white"
        >
          SKILLS
        </motion.h2>

        {!isSwipeable ? (
          // Initial magical entrance grid
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {allSkills.map((skill, index) => (
              <div key={index} className="w-40 h-48 relative mx-auto">
                <MagicalPortal delay={Math.floor(index / 2) * 0.3} index={index}>
                  <div className="w-16 h-16 mb-4 flex items-center justify-center">
                    {iconMap[skill.icon]}
                  </div>
                  <p className="text-gray-100 font-medium">{skill.name}</p>
                </MagicalPortal>
              </div>
            ))}
          </div>
        ) : (
          // Horizontal scrolling carousel
          <div className="relative max-w-6xl mx-auto">
            {/* Continuous Magical Background Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Floating Energy Rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`ring-${i}`}
                  className="absolute"
                  style={{
                    top: `${20 + (i * 25)}%`,
                    left: `${15 + (i * 30)}%`,
                    width: `${80 + (i * 20)}px`,
                    height: `${80 + (i * 20)}px`,
                  }}
                  animate={{
                    rotate: 360,
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    rotate: { duration: 10 + i * 2, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <div 
                    className="w-full h-full rounded-full border border-amber-400/30"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent, #f59e0b20, transparent)',
                      filter: 'blur(1px)',
                    }}
                  />
                </motion.div>
              ))}

              {/* Random Sparkles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  className="absolute w-1.5 h-1.5 bg-amber-400 rounded-full"
                  style={{
                    top: `${10 + (Math.random() * 80)}%`,
                    left: `${5 + (Math.random() * 90)}%`,
                    boxShadow: '0 0 8px #f59e0b',
                  }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                    x: [0, (Math.random() - 0.5) * 60],
                    y: [0, (Math.random() - 0.5) * 60],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 1.5,
                    repeat: Infinity,
                    delay: (i * 0.5) + Math.random(),
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>

            {/* Dynamic Category Title */}
            <motion.div
              key={getCurrentCategory()}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center mb-12 relative z-10"
            >
              <h3 className="text-2xl font-semibold text-gray-200 mb-3">
                {getCurrentCategory()}
              </h3>
              <div className="w-20 h-0.5 bg-amber-500 mx-auto"></div>
            </motion.div>

            {/* Carousel Container */}
            <div 
              className="relative"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Left Fade Gradient */}
              <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
              
              {/* Right Fade Gradient */}
              <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>

              {/* Cards Container */}
              <div className="overflow-hidden">
                <motion.div
                  ref={scrollContainerRef}
                  className="flex"
                  animate={{ x: -currentScrollIndex * (320 + 24) }} // 320px card width + 24px gap
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  {allSkills.map((skill, index) => (
                    <SkillCard key={index} skill={skill} index={index} />
                  ))}
                </motion.div>
              </div>

              {/* Navigation Arrows - Bottom Right */}
              <div className="absolute -bottom-12 right-8 flex space-x-3 z-20">
                <motion.button
                  onClick={scrollPrev}
                  disabled={currentScrollIndex === 0}
                  className="w-10 h-10 bg-gray-700/80 hover:bg-amber-600/80 disabled:bg-gray-800/50 disabled:cursor-not-allowed rounded-lg flex items-center justify-center transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-white text-lg font-bold">‹</span>
                </motion.button>
                
                <motion.button
                  onClick={scrollNext}
                  disabled={currentScrollIndex >= maxScrollIndex}
                  className="w-10 h-10 bg-gray-700/80 hover:bg-amber-600/80 disabled:bg-gray-800/50 disabled:cursor-not-allowed rounded-lg flex items-center justify-center transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-white text-lg font-bold">›</span>
                </motion.button>
              </div>
              
              {/* Progress Indicator */}
              <div className="flex justify-center mt-8 space-x-2 relative z-10">
                {Array.from({ length: maxScrollIndex + 1 }, (_, i) => (
                  <motion.div
                    key={i}
                    className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                      i === currentScrollIndex ? 'bg-amber-500' : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setCurrentScrollIndex(i)}
                  />
                ))}
              </div>

              {/* Hover Hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="text-center mt-6 relative z-10"
              >
                <p className="text-gray-500 text-sm">← Hover to auto-scroll or use navigation arrows →</p>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Skills;