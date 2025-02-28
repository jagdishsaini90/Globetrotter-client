import React from "react";
import Logo from "../assets/logo.webp";
import { motion, animate } from "framer-motion";
import { useQuestionContext } from "../context/questionContext";

const Header = () => {
  const { currentQuestionIndex } = useQuestionContext();
  const score = currentQuestionIndex * 10;
  return (
    <header>
      <img src={Logo} alt="Logo" width="150px" height="150px" />
      <div className="score-container">
        <h3 className="score-label">Your Score:</h3>
        <motion.span className="score-value" key={score}>
          {parseInt(score)}
        </motion.span>
      </div>
    </header>
  );
};

export default Header;
