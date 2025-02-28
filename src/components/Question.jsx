import React, { useState } from "react";
import { motion } from "framer-motion";
import Clues from "./Clues";
import Confetti from "react-confetti";
import FunFact from "./FunFact";
import { useQuestionContext } from "../context/questionContext";

const buttonAnimation = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.9 },
};

const Question = ({
  clues = [],
  fun_fact = [],
  options = [],
  correct_answer,
}) => {
  const [selected, setSelected] = useState(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const { setCurrentQuestionIndex, currentQuestionIndex, getQuestion } =
    useQuestionContext();

  const handleSelect = (option) => {
    const isCorrect = option.slice(0, 1) === correct_answer;
    setSelected(option);
    setIsCorrectAnswer(isCorrect);

    if (isCorrect) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 10000);
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (isCorrectAnswer) {
      setSelected(null);
      setIsCorrectAnswer(false);
      getQuestion();
    }
  };

  const handlePlayAgain = () => {
    setSelected(null);
    setIsCorrectAnswer(false);
    setCurrentQuestionIndex(0);
  };

  return (
    <div>
      <Clues texts={clues} />
      {showConfetti && <Confetti />}

      <div className="options-container">
        {options.map((option, index) => {
          const isSelected = selected === option;
          const isCorrect = option.slice(0, 1) === correct_answer;

          return (
            <motion.button
              key={index}
              onClick={() => handleSelect(option)}
              disabled={!!selected}
              className={`option-button ${
                isSelected ? (isCorrect ? "correct" : "wrong") : ""
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {option}
            </motion.button>
          );
        })}
      </div>

      <div className="button-container">
        <motion.button
          className="next-button"
          onClick={handleNext}
          {...buttonAnimation}
        >
          Next Question
        </motion.button>
        <motion.button
          className="play-again-button"
          onClick={handlePlayAgain}
          {...buttonAnimation}
        >
          Play Again
        </motion.button>
      </div>

      {selected && !isCorrectAnswer && (
        <motion.div
          className="sad-emoji"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Oops! 😢
        </motion.div>
      )}

      <FunFact
        isOpen={showConfetti}
        onClose={() => setShowConfetti(false)}
        text={fun_fact[0]}
      />
    </div>
  );
};

export default Question;
