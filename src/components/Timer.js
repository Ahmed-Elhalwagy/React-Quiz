import React, { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

export default function Timer() {
  const { dispatch, remainingseconds } = useQuiz();
  const mins = Math.floor(remainingseconds / 60);
  const secs = remainingseconds % 60;

  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "tick" });
        console.log("tick");
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <p className="timer">
      {mins < 10 && 0}
      {mins}
      {":"}
      {secs < 10 && 0}
      {secs}
    </p>
  );
}
