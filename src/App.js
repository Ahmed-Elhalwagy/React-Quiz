import Header from "./components/Header";
import "./App.css";
import Main from "./components/Main";
import Error from "./components/Error";
import Loader from "./components/Loader";

import { useEffect } from "react";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import FinishButton from "./components/FinishButton";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import { useQuiz } from "./context/QuizContext";

function App() {
  const { questions, status, index, dispatch } = useQuiz();

  useEffect(() => {
    async function fetchFakeData() {
      try {
        dispatch({ type: "dataLoading" });
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataRecived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed", payload: err });
      }
    }
    fetchFakeData();
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "error" && <Error />}
        {status === "loading" && <Loader />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question question={questions[index]} />
            <Footer>
              <Timer />
              <NextButton />
              <FinishButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
