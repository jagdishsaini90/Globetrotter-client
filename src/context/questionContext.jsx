import React, { createContext, useContext, useState } from "react";
import { CONFIG } from "../config";

const questionContext = createContext();

export const useQuestionContext = () => {
  return useContext(questionContext);
};

export const QuestionProvider = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [question, setQuestion] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answerStatus, setAnswerStatus] = useState("pending");

  const getQuestion = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(CONFIG.requestUrl);
      const data = await response.json();
      setQuestion(data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  const checkQuestion = (answer) => {
    if (answer.slice(0, 1) === question.correct_answer) {
      setAnswerStatus("correct");
    } else {
      setAnswerStatus("wrong");
    }
  };

  return (
    <questionContext.Provider
      value={{
        loading,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        getQuestion,
        question,
        error,
        checkQuestion,
        answerStatus,
      }}
    >
      {children}
    </questionContext.Provider>
  );
};
