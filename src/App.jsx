import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Question from "./components/Question";
import { useQuestionContext } from "./context/questionContext";

function App() {
  const { getQuestion, question, loading } = useQuestionContext();

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <>
      <Header />
      <h1 className="game-headline">🌃 Guess the City 🌆</h1>
      {!loading && <Question {...question} />}
    </>
  );
}

export default App;
