import React from "react";

export default function Progress({
  numQuestions,
  maxPoints,
  index,
  points,
  answer,
}) {
  return (
    <>
      <div className="progress">
        <progress max={numQuestions} value={index + Number(answer !== null)} />
        <p>
          Question <strong>{index + 1}</strong>/{numQuestions}
        </p>
        <p>
          Points: <strong>{points}</strong>/{maxPoints}
        </p>
      </div>
    </>
  );
}
