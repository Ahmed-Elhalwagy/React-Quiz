import { createContext, useContext, useReducer } from "react";

const QuizContext = createContext();

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

function QuizProvider({ children }) {
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
  const maxPoints = questions.reduce((acc, q) => acc + q.points, 0);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        remainingseconds,
        dispatch,
        numQuestions,
        maxPoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("The Quiz Context was used outside its Provider");
  return context;
}

export { QuizProvider, useQuiz };
