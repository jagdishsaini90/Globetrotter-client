import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Clues = ({ texts }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
    }, 7000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-carousel-container">
      <AnimatePresence mode="wait">
        <motion.h1
          key={index}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="text-carousel"
        >
          {texts[index]}
        </motion.h1>
      </AnimatePresence>

      <div className="dots">
        {texts.map((_, i) => (
          <div
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Clues;
