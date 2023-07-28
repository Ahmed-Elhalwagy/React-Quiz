import React from "react";
import { useQuiz } from "../context/QuizContext";

export default function NextButton() {
  const { dispatch, answer, numQuestions, index } = useQuiz();
  function handelNext() {
    dispatch({ type: "nextQuestion" });
  }
  if (index + 1 < numQuestions)
    return (
      <>
        {answer != null && (
          <button className="btn btn-ui" onClick={handelNext}>
            Next
          </button>
        )}
      </>
    );
}
