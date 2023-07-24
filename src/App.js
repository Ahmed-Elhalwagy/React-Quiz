import Header from "./components/Header";
import "./App.css";
import Main from "./components/Main";
import Error from "./components/Error";
import Loader from "./components/Loader";

import { useEffect, useReducer } from "react";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import FinishButton from "./components/FinishButton";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const intialState = {
  questions: [],
  index: 0,
  status: "loading", //loading, error, ready, active, finished
  answer: null,
  points: 0,
  highscore: 0,
  remainingseconds: 450,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "dataLoading":
      return { ...state, status: "loading" };
    case "active":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      const highScoreValue =
        state.points > state.highscore ? state.points : state.highscore;
      return { ...state, status: "finished", highscore: highScoreValue };
    case "restart":
      return {
        ...state,
        status: "active",
        index: 0,
        points: 0,
        answer: null,
        remainingseconds: 10,
      };
    case "tick":
      return {
        ...state,
        remainingseconds: state.remainingseconds - 1,
        status: state.remainingseconds === 0 ? "finished" : state.status,
      };
    default:
      throw Error("Action Unkown");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    remainingseconds,
  } = state;

  const numQuestions = questions.length;

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
  }, []);

  const maxPoints = questions.reduce((acc, q) => acc + q.points, 0);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "error" && <Error />}
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              maxPoints={maxPoints}
              index={index}
              points={points}
              answer={answer}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
              points={points}
            />
            <Footer>
              <Timer dispatch={dispatch} remainingseconds={remainingseconds} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
              <FinishButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            maxPoints={maxPoints}
            points={points}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
