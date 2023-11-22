import React, { useCallback, useContext } from "react";
import { Appcontext } from "../App";
function Backdrop() {
  const {
    gameOver,
    setGameOver,
    setBoard,
    setCurrentattempt,
    setDisabledletters,
    setAlmostletters,
    setCorrectletters,
  } = useContext(Appcontext);
  const removebackdrop = useCallback(() => {
    setGameOver((pre) => ({ ...pre, gameOver: false, guessedWord: false }));

    setBoard((pre) => [
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);
    setCurrentattempt((pre) => ({ ...pre, attempt: 0, letterpos: 0 }));
    setDisabledletters((pre) => []);
    setAlmostletters((pre) => []);
    setCorrectletters((pre) => []);
  }, [gameOver.gameOver]);
  return <div className="backdrop" onClick={removebackdrop}></div>;
}

export default Backdrop;
