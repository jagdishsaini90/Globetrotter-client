import React from "react";
import Logo from "../assets/logo.webp";
import { motion } from "framer-motion";
import { useQuestionContext } from "../context/questionContext";

const Header = () => {
  const { questionsData } = useQuestionContext();
  return (
    <>
      <header>
        <img src={Logo} alt="Logo" width="150px" height="150px" />
        <div className="right-menu">
          <div className="score-container">
            <h3 className="score-label">Correct:</h3>
            <motion.span className="score-value" key={questionsData.correct}>
              {parseInt(questionsData.correct)}
            </motion.span>
          </div>
          <div style={{ marginLeft: "10px" }} className="score-container">
            <h3 className="score-label">Wrong: </h3>
            <motion.span className="score-value" key={questionsData.wrong}>
              {parseInt(questionsData.wrong)}
            </motion.span>
          </div>

          <div style={{ marginLeft: "10px" }} className="score-container">
            <h3 className="score-label">Score: </h3>
            <motion.span className="score-value">
              {parseInt(questionsData.correct * 10)}
            </motion.span>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
