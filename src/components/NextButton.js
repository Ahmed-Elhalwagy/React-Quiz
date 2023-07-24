import React from "react";

export default function NextButton({ dispatch, answer, numQuestions, index }) {
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
