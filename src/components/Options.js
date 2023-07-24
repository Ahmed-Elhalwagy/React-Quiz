export default function Options({ question, dispatch, answer, points }) {
  function optionHandler(index) {
    dispatch({ type: "newAnswer", payload: index });
  }

  return (
    <div className="options">
      {question.options.map((option, i) => {
        return (
          <button
            key={i}
            className={`btn btn-option ${i === answer ? "answer" : ""} ${
              answer != null
                ? i === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            disabled={answer != null}
            onClick={() => optionHandler(i)}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
