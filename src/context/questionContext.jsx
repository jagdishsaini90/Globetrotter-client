import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { CONFIG } from "../config";

const QuestionContext = createContext();

export const useQuestionContext = () => useContext(QuestionContext);

export const QuestionProvider = ({ children }) => {
  const [questionsData, setQuestionData] = useState({
    correct: 0,
    wrong: 0,
  });
  const [question, setQuestion] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answerStatus, setAnswerStatus] = useState("pending");

  const getQuestion = useCallback(async () => {
    setLoading(true);
    setError(null);
    setAnswerStatus("pending");

    try {
      const response = await fetch(CONFIG.requestUrl);
      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`);

      const data = await response.json();
      setQuestion(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const checkQuestion = useCallback(
    (answer) => {
      const isCorrect = answer.charAt(0) === question.correct_answer;
      setAnswerStatus(isCorrect ? "correct" : "wrong");

      if (isCorrect) {
        setQuestionData((prev) => ({ ...prev, correct: prev.correct + 1 }));
      } else {
        setQuestionData((prev) => ({ ...prev, wrong: prev.wrong + 1 }));
      }

      return true;
    },
    [question.correct_answer]
  );

  const contextValue = useMemo(
    () => ({
      loading,
      questionsData,
      setQuestionData,
      getQuestion,
      question,
      error,
      checkQuestion,
      answerStatus,
      setAnswerStatus,
    }),
    [
      loading,
      questionsData,
      question,
      error,
      answerStatus,
      getQuestion,
      checkQuestion,
    ]
  );

  return (
    <QuestionContext.Provider value={contextValue}>
      {children}
    </QuestionContext.Provider>
  );
};
