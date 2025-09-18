import { useState, useEffect, useRef } from 'react';
import ColorThief from 'colorthief';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import SRMSImg from '../../assets/images/SRMS.png';
import EmotionImg from '../../assets/images/Emotion.png';
import ShopeeImg from '../../assets/images/Shopee.png';

// Enhanced 3D Parallax Background Component (unchanged)
function ParallaxBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect?.() || { left: 0, top: 0 };
      setMousePosition({
        x: ((e.clientX - rect.left) / window.innerWidth) * 100,
        y: ((e.clientY - rect.top) / window.innerHeight) * 100,
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const updateTime = () => {
      setTime(Date.now() * 0.001);
    };

    const timeInterval = setInterval(updateTime, 50);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const dynamicShapes = [
    { size: 150, x: 15, y: 25, speed: 0.8, type: 'morphing-blob', color: 'from-blue-400 to-purple-600' },
    { size: 100, x: 75, y: 15, speed: 0.6, type: 'rotating-cube', color: 'from-teal-400 to-blue-600' },
    { size: 200, x: 55, y: 65, speed: 1.0, type: 'pulsing-ring', color: 'from-purple-400 to-pink-600' },
    { size: 80, x: 25, y: 70, speed: 0.4, type: 'floating-diamond', color: 'from-green-400 to-teal-600' },
    { size: 120, x: 85, y: 80, speed: 0.7, type: 'wave-circle', color: 'from-yellow-400 to-orange-600' },
    { size: 90, x: 10, y: 50, speed: 0.5, type: 'spiral-square', color: 'from-pink-400 to-red-600' },
    { size: 160, x: 70, y: 35, speed: 0.9, type: 'breathing-hexagon', color: 'from-indigo-400 to-purple-600' },
    { size: 70, x: 40, y: 85, speed: 0.3, type: 'twisting-triangle', color: 'from-cyan-400 to-blue-600' }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dynamic Gradient Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(139, 69, 199, 0.3) 0%, 
            rgba(59, 130, 246, 0.2) 25%, 
            rgba(16, 185, 129, 0.2) 50%, 
            rgba(236, 72, 153, 0.1) 75%, 
            transparent 100%)
          `,
          transform: `translateZ(0) scale(${1 + Math.sin(time * 0.5) * 0.1})`,
        }}
      ></div>
      
      {/* Enhanced Floating Shapes */}
      {dynamicShapes.map((shape, index) => {
        const dynamicX = (mousePosition.x - 50) * shape.speed * 0.3;
        const dynamicY = (mousePosition.y - 50) * shape.speed * 0.2 + scrollY * shape.speed * 0.05;
        const timeOffset = time + index * 0.5;
        const pulse = Math.sin(timeOffset) * 0.2 + 1;
        const rotation = time * 20 + index * 45;
        
        return (
          <div
            key={index}
            className="absolute"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: `${shape.size * pulse}px`,
              height: `${shape.size * pulse}px`,
              transform: `
                translate3d(${dynamicX}px, ${dynamicY}px, 0)
                rotate(${rotation}deg)
                scale(${1 + Math.sin(timeOffset * 0.7) * 0.3})
              `,
              transition: 'transform 0.1s ease-out',
            }}
          >
            {shape.type === 'morphing-blob' && (
              <div 
                className={`w-full h-full bg-gradient-to-br ${shape.color} opacity-20 blur-sm`}
                style={{
                  borderRadius: `${40 + Math.sin(timeOffset) * 30}% ${60 + Math.cos(timeOffset * 1.2) * 30}% ${50 + Math.sin(timeOffset * 0.8) * 40}% ${70 + Math.cos(timeOffset * 1.5) * 20}%`,
                }}
              ></div>
            )}
            
            {shape.type === 'rotating-cube' && (
              <div 
                className={`w-full h-full bg-gradient-to-br ${shape.color} opacity-25`}
                style={{
                  transform: `perspective(200px) rotateX(${Math.sin(timeOffset) * 45}deg) rotateY(${Math.cos(timeOffset) * 45}deg)`,
                  borderRadius: `${Math.abs(Math.sin(timeOffset)) * 20}px`,
                }}
              ></div>
            )}
            
            {shape.type === 'pulsing-ring' && (
              <div className="relative w-full h-full">
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${shape.color} opacity-15 rounded-full`}
                  style={{
                    transform: `scale(${0.3 + Math.abs(Math.sin(timeOffset)) * 0.7})`,
                  }}
                ></div>
                <div 
                  className={`absolute inset-4 bg-gradient-to-br ${shape.color} opacity-20 rounded-full`}
                  style={{
                    transform: `scale(${0.5 + Math.abs(Math.cos(timeOffset * 1.3)) * 0.5})`,
                  }}
                ></div>
              </div>
            )}
            
            {shape.type === 'floating-diamond' && (
              <div 
                className={`w-full h-full bg-gradient-to-br ${shape.color} opacity-25`}
                style={{
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  transform: `rotate(${Math.sin(timeOffset) * 180}deg) scale(${0.8 + Math.abs(Math.cos(timeOffset)) * 0.4})`,
                }}
              ></div>
            )}
            
            {shape.type === 'wave-circle' && (
              <div className="relative w-full h-full">
                {[0, 1, 2].map((ring) => (
                  <div
                    key={ring}
                    className={`absolute bg-gradient-to-br ${shape.color} rounded-full opacity-15`}
                    style={{
                      inset: `${ring * 15}%`,
                      transform: `scale(${1 + Math.sin(timeOffset + ring * 0.5) * 0.3}) rotate(${time * (10 + ring * 5)}deg)`,
                    }}
                  ></div>
                ))}
              </div>
            )}
            
            {shape.type === 'spiral-square' && (
              <div className="relative w-full h-full">
                {[0, 1, 2, 3].map((layer) => (
                  <div
                    key={layer}
                    className={`absolute bg-gradient-to-br ${shape.color} opacity-20`}
                    style={{
                      inset: `${layer * 10}%`,
                      transform: `rotate(${time * 15 + layer * 45}deg) scale(${1 + Math.sin(timeOffset + layer) * 0.2})`,
                      borderRadius: `${layer * 5}px`,
                    }}
                  ></div>
                ))}
              </div>
            )}
            
            {shape.type === 'breathing-hexagon' && (
              <div 
                className={`w-full h-full bg-gradient-to-br ${shape.color} opacity-20`}
                style={{
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                  transform: `scale(${0.7 + Math.abs(Math.sin(timeOffset * 0.8)) * 0.6}) rotate(${time * 8}deg)`,
                }}
              ></div>
            )}
            
            {shape.type === 'twisting-triangle' && (
              <div 
                className={`w-full h-full bg-gradient-to-br ${shape.color} opacity-25`}
                style={{
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  transform: `
                    rotateY(${Math.sin(timeOffset) * 60}deg) 
                    rotateX(${Math.cos(timeOffset) * 30}deg)
                    scale(${0.8 + Math.abs(Math.sin(timeOffset * 1.2)) * 0.4})
                  `,
                  transformStyle: 'preserve-3d',
                }}
              ></div>
            )}
          </div>
        );
      })}

      {/* Dynamic Light Rays */}
      {[0, 1, 2, 3, 4].map((ray) => (
        <div
          key={`ray-${ray}`}
          className="absolute opacity-10"
          style={{
            width: '2px',
            height: '100vh',
            background: `linear-gradient(to bottom, transparent, rgba(${100 + ray * 30}, ${150 + ray * 20}, 255, 0.5), transparent)`,
            left: `${20 + ray * 15}%`,
            transform: `
              translateX(${(mousePosition.x - 50) * (0.1 + ray * 0.05)}px)
              rotate(${Math.sin(time * 0.3 + ray) * 5}deg)
            `,
          }}
        ></div>
      ))}

      {/* Floating Energy Orbs */}
      {Array.from({ length: 15 }).map((_, index) => (
        <div
          key={`orb-${index}`}
          className="absolute rounded-full"
          style={{
            width: `${4 + (index % 3) * 2}px`,
            height: `${4 + (index % 3) * 2}px`,
            background: `radial-gradient(circle, rgba(${100 + index * 10}, ${150 + index * 8}, 255, 0.8), transparent)`,
            left: `${(index * 7) % 100}%`,
            top: `${(index * 13) % 100}%`,
            transform: `
              translate3d(
                ${(mousePosition.x - 50) * (0.05 + index * 0.003)}px,
                ${(mousePosition.y - 50) * (0.03 + index * 0.002) + scrollY * (0.01 + index * 0.001) + Math.sin(time + index * 0.5) * 20}px,
                0
              )
              scale(${1 + Math.sin(time * 2 + index * 0.3) * 0.5})
            `,
            filter: `blur(${Math.abs(Math.sin(time + index)) * 2}px)`,
          }}
        ></div>
      ))}

      {/* Interactive Mesh Grid */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: `${50 + Math.sin(time * 0.2) * 10}px ${50 + Math.cos(time * 0.15) * 10}px`,
            transform: `
              translateX(${(mousePosition.x - 50) * 0.1}px)
              translateY(${(mousePosition.y - 50) * 0.05}px)
              rotate(${Math.sin(time * 0.1) * 2}deg)
            `,
          }}
        ></div>
      </div>
    </div>
  );
}

// Project Card Component (unchanged)
function ProjectCard({ project }) {
  const [bgColor, setBgColor] = useState('rgb(31, 41, 55)');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const colorThief = new ColorThief();
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = project.image;

    img.onload = () => {
      const dominantColor = colorThief.getColor(img);
      setBgColor(`rgb(${dominantColor.join(',')})`);

      const brightness = Math.round((
        parseInt(dominantColor[0]) * 299 +
        parseInt(dominantColor[1]) * 587 +
        parseInt(dominantColor[2]) * 114
      ) / 1000);

      setTheme(brightness > 140 ? 'light' : 'dark');
    };
  }, [project.image]);

  return (
    <div className="group relative h-96 w-full overflow-hidden rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:translate-y-6"
      />

      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-6 text-white transition-opacity duration-500 group-hover:opacity-0">
        <span className="text-sm font-semibold uppercase tracking-wider text-gray-300">
          {project.category}
        </span>
        <h3 className="text-2xl font-bold">{project.title}</h3>
      </div>

      <div
        className={`absolute inset-y-0 right-0 flex w-full flex-col justify-center p-6 transform transition-transform duration-700 ease-in-out translate-x-full group-hover:translate-x-0 ${
          theme === 'light' ? 'text-slate-900' : 'text-white'
        }`}
        style={{ backgroundColor: bgColor }}
      >
        <p className={`mb-4 text-sm leading-relaxed ${theme === 'light' ? 'text-slate-700' : 'text-gray-300'}`}>
          {project.description}
        </p>
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((tag, tagIndex) => (
            <span 
              key={tagIndex} 
              className={`rounded-full px-3 py-1 text-xs ${
                theme === 'light' 
                ? 'bg-black/10 border-black/20' 
                : 'bg-white/20 border-white/30'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center text-sm font-semibold group/button hover:scale-105 transition-transform duration-300"
        >
          View Project
          <svg className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover/button:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}

// Main Portfolio Component with Zig-Zag Layout
function Portfolio() {
  const projects = [
    {
      title: "Student Result Management System",
      category: "JavaScript Project",
      description: "A web based system enabling students to view and download their results in PDF. Suitable for school/college use.",
      image: SRMSImg,
      tags: ["JavaScript", "PHP", "MySQL"],
      link: "https://github.com/mishrayashmishra/SRMS"
    },
    {
      title: "Emotion Detection Through Text",
      category: "Python Project",
      description: "Built a model to predict emotions (happy,sad,angry,neutral) from text using LinearSVC. Displays the predicted emotion via emojis.",
      image: EmotionImg,
      tags: ["Python", "Flask", "Machine Learning"],
      link: "https://github.com/mishrayashmishra/Emotion-Detection"
    },
    {
      title: "Mobile Shopee",
      category: "JavaScript Project",
      description: "A basic e-commerce clone focused on smartphones. Features product display, add to cart/wishlist. No login or payment gateway.",
      image: ShopeeImg,
      tags: ["JavaScript", "PHP"],
      link: "https://github.com/mishrayashmishra/MobileShopee"
    }
  ];

  return (
    <>
      {/* CSS for animations and custom shapes */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-10px) rotate(5deg); }
        }
        
        .clip-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>

      <section
        id="portfolio"
        className="relative w-full min-h-[150vh] py-32 bg-gray-900 overflow-hidden"
      >
        {/* 3D Parallax Background */}
        <ParallaxBackground />
        
        <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
          {/* Title */}
          <ScrollReveal delay={0.2}>
            <h2 className="text-6xl font-bold text-center mb-32 text-white tracking-widest">
              PORTFOLIO
            </h2>
          </ScrollReveal>
          
          {/* Zig-Zag Layout Container */}
          <div className="space-y-32">
            {projects.map((project, index) => (
              <ScrollReveal key={index} delay={0.4 + index * 0.2}>
                <div
                  className={`flex ${
                    index % 2 === 0 ? 'justify-end' : 'justify-start'
                  } w-full`}
                >
                  <div 
                    className="w-full max-w-lg transform transition-all duration-700 hover:scale-105"
                    style={{
                      transform: `translateX(${index % 2 === 0 ? '0' : '0'}) translateY(${index * -20}px)`,
                    }}
                  >
                    <ProjectCard project={project} />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Scroll Indicator */}
          <ScrollReveal delay={1.2}>
            <div className="flex justify-center mt-32 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

export default Portfolio;