import React, { useContext, useEffect } from "react";
import { Appcontext } from "../App";
function Letter({ letterpos, attemptval }) {
  const {
    board,
    correctWord,
    currentattempt,
    setDisabledletters,
    setAlmostletters,
    setCorrectletters,
  } = useContext(Appcontext);
  const letter = board[attemptval][letterpos];
  const correct =
    correctWord[letterpos] === letter.toLowerCase() && letter.length > 0;
  const almost =
    !correct && correctWord.includes(letter.toLowerCase()) && letter.length > 0;

  const letterState =
    currentattempt.attempt > attemptval
      ? correct
        ? "correct"
        : almost
        ? "almost"
        : "error"
      : "";
  useEffect(() => {
    if (letter.length > 0 && !correct && !almost) {
      setDisabledletters((pre) => [...pre, letter]);
    }
    if (almost) {
      setAlmostletters((pre) => [...pre, letter]);
    }
    if (correct) {
      setCorrectletters((pre) => [...pre, letter]);
    }
  }, [currentattempt.attempt]);
  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
}
export default Letter;
