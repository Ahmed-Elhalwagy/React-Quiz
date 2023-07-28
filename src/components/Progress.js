import React from "react";
import { useQuiz } from "../context/QuizContext";

export default function Progress() {
  const { numQuestions, index, answer, maxPoints, points } = useQuiz();

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
