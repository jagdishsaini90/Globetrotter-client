import React, { createContext, useContext, useState } from "react";

const questionContext = createContext();

export const useQuestionContext = () => {
  return useContext(questionContext);
};

export const QuestionProvider = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [question, setQuestion] = useState({});
  const [loading, setLoading] = useState(true);

  const getQuestion = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/question");
      const data = await response.json();
      setQuestion(data);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
    setLoading(false);
  };

  return (
    <questionContext.Provider
      value={{ loading, currentQuestionIndex, setCurrentQuestionIndex, getQuestion, question }}
    >
      {children}
    </questionContext.Provider>
  );
};
