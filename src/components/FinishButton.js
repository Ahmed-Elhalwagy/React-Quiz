import React from "react";
import { useQuiz } from "../context/QuizContext";

export default function FinishButton() {
  const { dispatch, answer, index, numQuestions } = useQuiz();

  function handelFinish() {
    dispatch({ type: "finished" });
  }
  if (index + 1 === numQuestions)
    return (
      <>
        {answer != null && (
          <button className="btn btn-ui" onClick={handelFinish}>
            Finish
          </button>
        )}
      </>
    );
}
