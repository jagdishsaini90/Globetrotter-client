import React from "react";
import { motion } from "framer-motion";

const MessageModal = ({ isOpen, onClose, type, text }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    console.log("Clicked Element:", e.target);
    if (e.target === e.currentTarget) {
      console.log("Closing Modal");
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overlay"
      onClick={handleOverlayClick}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`modal-content ${type ? "oops" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {type ? (
          <>
            <h2>Oops! 😢</h2>
            <p>{text}</p>
          </>
        ) : (
          <>
            <h2>Fun Fact</h2>
            <p>{text}</p>
          </>
        )}
        <button onClick={onClose}>Close</button>
      </motion.div>
    </motion.div>
  );
};

export default MessageModal;
