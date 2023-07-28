import React from "react";
import { useQuiz } from "../context/QuizContext";

export default function FinishScreen() {
  const { points, maxPoints, dispatch, highscore } = useQuiz();
  const percentage = (points / maxPoints) * 100;

  function handelRestart() {
    dispatch({ type: "restart" });
  }

  return (
    <div>
      <p className="result">
        You Scored <strong>{points}</strong> out of {maxPoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>

      <button className="btn btn-ui" onClick={handelRestart}>
        Restart
      </button>
    </div>
  );
}
