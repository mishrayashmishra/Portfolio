import { motion } from 'framer-motion';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

function About() {
  return (
    // Main section container with relative positioning and overflow hidden
    // The background diagonal is applied here via CSS.
    <section id="about" className="min-h-screen w-full relative overflow-hidden about-diagonal-container">
      {/* Content Layer 1: This layer will have white text (visible over the black background) */}
      {/* It is absolutely positioned to cover the entire section */}
      <div className="absolute inset-0 flex items-center justify-center px-8 md:px-16 py-20 z-10">
        <div className="max-w-4xl w-full">
          {/* Title Box */}
          <ScrollReveal delay={0.2}>
            <div className="mb-8 flex justify-center">
              <h2
                className="uppercase tracking-[0.35em] text-[1.1rem] font-medium border-2 border-gray-400 px-12 py-3 bg-transparent shadow-lg text-white"
                style={{ letterSpacing: "0.35em" }}
              >
                ABOUT ME
              </h2>
            </div>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal delay={0.4}>
            <p className="text-center text-xs mb-8 font-light leading-relaxed text-white">
              Passionate front-end developer with a keen eye for design and user experience. 
              I create digital solutions that are both beautiful and functional, 
              bringing ideas to life through clean code and creative problem-solving.
            </p>
          </ScrollReveal>

          {/* Explore */}
          <ScrollReveal delay={0.6}>
            <div className="flex items-center justify-center mb-8">
              <span className="text-xs tracking-widest font-light mx-2 text-white">|</span>
              <span className="text-xs tracking-widest font-semibold mx-2 uppercase text-white">Explore</span>
              <span className="text-xs tracking-widest font-light mx-2 text-white">|</span>
            </div>
          </ScrollReveal>

          {/* Decorative Divider */}
          <ScrollReveal delay={0.8}>
            <div className="mb-12 flex justify-center">
              <div className="flex items-center">
                <motion.span 
                  className="w-24 h-px bg-gray-400"
                  initial={{ width: 0 }}
                  animate={{ width: 96 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                />
                <span 
                  className="mx-2 text-lg text-gray-400"
                  style={{ fontFamily: "serif" }}
                >
                  ⋱⋰
                </span>
                <motion.span 
                  className="w-24 h-px bg-gray-400"
                  initial={{ width: 0 }}
                  animate={{ width: 96 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Services Grid */}
          <ScrollReveal delay={1.0}>
            <div className="w-full">
              <div className="flex flex-col space-y-8">
                {/* Design & Development Row */}
                <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
                  {/* Design */}
                  <ScrollReveal delay={1.2}>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="font-semibold tracking-[0.25em] text-xs uppercase mb-3 text-white">
                        DESIGN
                      </h3>
                      <p className="text-[0.7rem] text-gray-300 leading-relaxed">
                        I create intuitive and visually appealing designs that enhance user experience. 
                        From wireframes to high-fidelity prototypes, I focus on user-centered design principles.
                      </p>
                    </div>
                  </ScrollReveal>

                  {/* Development */}
                  <ScrollReveal delay={1.4}>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="font-semibold tracking-[0.25em] text-xs uppercase mb-3 text-white">
                        DEVELOPMENT
                      </h3>
                      <p className="text-[0.7rem] text-gray-300 leading-relaxed">
                        I bring designs to life with clean, efficient code using modern technologies. 
                        Specializing in React, JavaScript, and responsive web development.
                      </p>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Maintenance Centered */}
                <ScrollReveal delay={1.6}>
                  <div className="flex flex-col items-center text-center">
                    <h3 className="font-semibold tracking-[0.25em] text-xs uppercase mb-3 text-white">
                      MAINTENANCE
                    </h3>
                    <p className="text-[0.7rem] text-gray-300 leading-relaxed max-w-sm">
                      I provide ongoing support and maintenance to ensure your website stays 
                      up-to-date, secure, and performing at its best.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </ScrollReveal>

          {/* Bottom Divider */}
          <ScrollReveal delay={1.8}>
            <div className="mt-12 flex justify-center">
              <div className="flex items-center">
                <motion.span 
                  className="w-24 h-px bg-gray-400"
                  initial={{ width: 0 }}
                  animate={{ width: 96 }}
                  transition={{ duration: 0.8, delay: 2.3 }}
                />
                <span 
                  className="mx-2 text-lg text-gray-400"
                  style={{ fontFamily: "serif" }}
                >
                  ⋱⋰
                </span>
                <motion.span 
                  className="w-24 h-px bg-gray-400"
                  initial={{ width: 0 }}
                  animate={{ width: 96 }}
                  transition={{ duration: 0.8, delay: 2.3 }}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Content Layer 2: This layer will have black text (visible over the light background) */}
      {/* It is absolutely positioned on top of Layer 1 and will be clipped */}
      <div className="absolute inset-0 flex items-center justify-center px-8 md:px-16 py-20 z-20 about-content-clipped">
        <div className="max-w-4xl w-full">
          {/* Title Box */}
          <ScrollReveal delay={0.2}>
            <div className="mb-8 flex justify-center">
              <h2
                className="uppercase tracking-[0.35em] text-[1.1rem] font-medium border-2 border-gray-400 px-12 py-3 bg-transparent shadow-lg text-black"
                style={{ letterSpacing: "0.35em" }}
              >
                ABOUT ME
              </h2>
            </div>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal delay={0.4}>
            <p className="text-center text-xs mb-8 font-light leading-relaxed text-black">
              Passionate front-end developer with a keen eye for design and user experience. 
              I create digital solutions that are both beautiful and functional, 
              bringing ideas to life through clean code and creative problem-solving.
            </p>
          </ScrollReveal>

          {/* Explore */}
          <ScrollReveal delay={0.6}>
            <div className="flex items-center justify-center mb-8">
              <span className="text-xs tracking-widest font-light mx-2 text-black">|</span>
              <span className="text-xs tracking-widest font-semibold mx-2 uppercase text-black">Explore</span>
              <span className="text-xs tracking-widest font-light mx-2 text-black">|</span>
            </div>
          </ScrollReveal>

          {/* Decorative Divider */}
          <ScrollReveal delay={0.8}>
            <div className="mb-12 flex justify-center">
              <div className="flex items-center">
                <motion.span 
                  className="w-24 h-px bg-gray-400"
                  initial={{ width: 0 }}
                  animate={{ width: 96 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                />
                <span 
                  className="mx-2 text-lg text-gray-400"
                  style={{ fontFamily: "serif" }}
                >
                  ⋱⋰
                </span>
                <motion.span 
                  className="w-24 h-px bg-gray-400"
                  initial={{ width: 0 }}
                  animate={{ width: 96 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Services Grid */}
          <ScrollReveal delay={1.0}>
            <div className="w-full">
              <div className="flex flex-col space-y-8">
                {/* Design & Development Row */}
                <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
                  {/* Design */}
                  <ScrollReveal delay={1.2}>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="font-semibold tracking-[0.25em] text-xs uppercase mb-3 text-black">
                        DESIGN
                      </h3>
                      <p className="text-[0.7rem] text-gray-600 leading-relaxed">
                        I create intuitive and visually appealing designs that enhance user experience. 
                        From wireframes to high-fidelity prototypes, I focus on user-centered design principles.
                      </p>
                    </div>
                  </ScrollReveal>

                  {/* Development */}
                  <ScrollReveal delay={1.4}>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="font-semibold tracking-[0.25em] text-xs uppercase mb-3 text-black">
                        DEVELOPMENT
                      </h3>
                      <p className="text-[0.7rem] text-gray-700 leading-relaxed">
                        I bring designs to life with clean, efficient code using modern technologies. 
                        Specializing in React, JavaScript, and responsive web development.
                      </p>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Maintenance Centered */}
                <ScrollReveal delay={1.6}>
                  <div className="flex flex-col items-center text-center">
                    <h3 className="font-semibold tracking-[0.25em] text-xs uppercase mb-3 text-black">
                      MAINTENANCE
                    </h3>
                    <p className="text-[0.7rem] text-gray-700 leading-relaxed max-w-sm">
                      I provide ongoing support and maintenance to ensure your website stays 
                      up-to-date, secure, and performing at its best.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </ScrollReveal>

          {/* Bottom Divider */}
          <ScrollReveal delay={1.8}>
            <div className="mt-12 flex justify-center">
              <div className="flex items-center">
                <motion.span 
                  className="w-24 h-px bg-gray-400"
                  initial={{ width: 0 }}
                  animate={{ width: 96 }}
                  transition={{ duration: 0.8, delay: 2.3 }}
                />
                <span 
                  className="mx-2 text-lg text-gray-400"
                  style={{ fontFamily: "serif" }}
                >
                  ⋱⋰
                </span>
                <motion.span 
                  className="w-24 h-px bg-gray-400"
                  initial={{ width: 0 }}
                  animate={{ width: 96 }}
                  transition={{ duration: 0.8, delay: 2.3 }}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default About;