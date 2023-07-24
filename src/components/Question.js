import React from "react";
import Options from "./Options";

export default function Question({ question, dispatch, answer, points }) {
  return (
    <div>
      <h3>{question.question}</h3>
      <Options
        question={question}
        answer={answer}
        dispatch={dispatch}
        points={points}
      />
    </div>
  );
}
