import React from "react";

export default function StartScreen({ numQuestions, dispatch }) {
  function handelStartClick() {
    dispatch({ type: "active" });
  }
  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3>{numQuestions} Questions to test your React Knowladge</h3>
      <button className="btn btn-ui" onClick={handelStartClick}>
        Let's Start
      </button>
    </div>
  );
}
