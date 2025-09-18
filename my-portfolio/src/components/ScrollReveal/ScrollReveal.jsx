// src/components/ScrollReveal.jsx

import { motion } from "framer-motion";

const ScrollReveal = ({ children, delay = 0, duration = 0.6 }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 }, // Start 50px below and invisible
        visible: { opacity: 1, y: 0 },   // End at original position and fully visible
      }}
      initial="hidden"
      whileInView="visible" // Animate to "visible" when the component is in view
      viewport={{ once: false, amount: 0.1 }} // Re-triggers animation every time, starts when 10% of the element is visible
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;