import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Question from "./components/Question";
import Loader from "./components/Loader";
import { useQuestionContext } from "./context/questionContext";

function App() {
  const { getQuestion, question, loading, error } = useQuestionContext();

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <>
      <Header />
      <h1 className="game-headline">🌃 Guess the City 🌆</h1>
      {loading ? <Loader /> : <Question {...question} />}
      {error && <Error error={error} />}
    </>
  );
}

export default App;
