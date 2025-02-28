import React, { useState } from "react";
import { motion } from "framer-motion";
import Clues from "./Clues";
import Confetti from "react-confetti";
import { useQuestionContext } from "../context/questionContext";
import MessageModal from "./MessageModal";

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
  trivia = [],
  correct_answer,
}) => {
  const [selected, setSelected] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const { setCurrentQuestionIndex, getQuestion, checkQuestion, answerStatus } =
    useQuestionContext();

  const handleSelect = (option) => {
    setSelected(option);
    if (checkQuestion(option)) {
      setShowConfetti(true);
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleGenerate = () => {
    setSelected(null);
    getQuestion();
  };

  const handleNext = () => {
    if (answerStatus === "correct") {
      handleGenerate();
    }
  };

  const handlePlayAgain = () => {
    handleGenerate();
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

      <MessageModal
        isOpen={answerStatus !== "pending"}
        onClose={() => setShowConfetti(false)}
        text={answerStatus === "wrong" ? trivia[0] : fun_fact[0]}
        type={answerStatus === "wrong"}
      />
    </div>
  );
};

export default Question;
