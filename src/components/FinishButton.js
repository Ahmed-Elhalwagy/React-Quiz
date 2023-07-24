import React from "react";

export default function FinishButton({
  dispatch,
  answer,
  numQuestions,
  index,
}) {
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
