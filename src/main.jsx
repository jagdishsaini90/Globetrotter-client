import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QuestionProvider } from "./context/questionContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QuestionProvider>
      <App />
    </QuestionProvider>
  </StrictMode>
);
