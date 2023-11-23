import React, { useCallback, useContext } from "react";
import { Appcontext } from "../App";
import Backdrop from "./Backdrop";
function Gameover() {
  const {
    gameOver,
    setGameOver,
    setBoard,
    currentattempt,
    setCurrentattempt,
    setDisabledletters,
    setAlmostletters,
    setCorrectletters,
    correctWord,
    flagnum,
  } = useContext(Appcontext);
  const removeresultmodal = useCallback(() => {
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

  return (
    <>
      {gameOver.gameOver && <Backdrop />}
      <div
        className={`gameover ${
          gameOver.guessedWord || flagnum % 2 === 0 ? "green" : "red"
        } ${gameOver.gameOver ? "gameoverShow" : ""} ${
          gameOver.gameOver ? "gameoverZindex" : ""
        }`}
      >
        <div className="modalclose">
          <span onClick={removeresultmodal}>&times;</span>
        </div>
        <h3>
          {gameOver.guessedWord || flagnum % 2 === 0
            ? "You Correctly Guessed the Wordle"
            : "You Failed to Guess the Word"}
        </h3>
        <h1>
          Correct Word: <span></span>
          <span>
            {correctWord.includes("\r")
              ? correctWord.slice(0, 5).toUpperCase()
              : correctWord.toUpperCase()}
          </span>
        </h1>
        {(gameOver.guessedWord || flagnum % 2 === 0) && (
          <h3>You guessed in {currentattempt.attempt} attempts</h3>
        )}
      </div>
    </>
  );
}

export default Gameover;
