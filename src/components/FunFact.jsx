import { motion } from "framer-motion";

const FunFact = ({ isOpen, onClose, text }) => {
  if (!isOpen) return null; // Hide when not open

  return (
    <div className="overlay" onClick={onClose}>
      <motion.div
        className="modal-content"
        initial={{ y: "-10vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-10vh", opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        Fun Fact
        <p>{text}</p>
      </motion.div>
    </div>
  );
};

export default FunFact;
