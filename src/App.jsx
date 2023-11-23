import React, { createContext, useState, useEffect } from "react";
import "./App.css";
import Board from "./components/Board.jsx";
import KeyBoard from "./components/KeyBoard.jsx";
import { boardDefault } from "./Words";
import { generateWord } from "./Words";
import Gameover from "./components/Gameover";
import Swal from "sweetalert2";
export const Appcontext = createContext();
function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currentattempt, setCurrentattempt] = useState({
    attempt: 0,
    letterpos: 0,
  });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledletters, setDisabledletters] = useState([]);
  const [almostletters, setAlmostletters] = useState([]);
  const [correctletters, setCorrectletters] = useState([]);
  const [correctWord, setCorrectWord] = useState("");
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const onSelect = (keyval) => {
    if (currentattempt.letterpos > 4) return null;
    const newboard = [...board];
    newboard[currentattempt.attempt][currentattempt.letterpos] = keyval;
    setBoard((pre) => newboard);
    setCurrentattempt((pre) => ({
      ...pre,
      letterpos: currentattempt.letterpos + 1,
    }));
  };
  const onDelete = () => {
    if (currentattempt.letterpos === 0) return null;
    const newboard = [...board];
    newboard[currentattempt.attempt][currentattempt.letterpos - 1] = "";
    setBoard((pre) => newboard);
    setCurrentattempt((pre) => ({
      ...pre,
      letterpos: currentattempt.letterpos - 1,
    }));
  };
  const onEnter = () => {
    if (currentattempt.letterpos !== 5) return null;
    let curword = "";
    for (let i = 0; i < 5; i++) {
      curword += board[currentattempt.attempt][i];
    }
    if (wordSet.has(`${curword.toLowerCase()}\r`)) {
      setCurrentattempt((pre) => ({
        ...pre,
        letterpos: 0,
        attempt: currentattempt.attempt + 1,
      }));
    } else {
      console.log(curword.toLowerCase());
      console.log(wordSet.has(`${curword.toLowerCase()}\r`));
      console.log(wordSet.has("right\r"));
      console.log(wordSet.has("right"));
      console.log(`${curword.toLowerCase()}\r`);
      const newboard = [...board];
      newboard[currentattempt.attempt] = ["", "", "", "", ""];
      Swal.fire({
        title: "Oops...",
        text: "Word not Found! Please Try Again",
        icon: "error",
      }).then((x) => {
        setBoard((pre) => newboard);
        setCurrentattempt((pre) => ({
          ...pre,
          letterpos: 0,
        }));
      });
    }
    if (curword.toLowerCase() === correctWord.toLowerCase()) {
      setGameOver((pre) => ({ ...pre, gameOver: true, guessedWord: true }));
    }
    if (currentattempt.attempt === 5 && wordSet.has(curword.toLowerCase())) {
      setGameOver((pre) => ({ ...pre, gameOver: true, guessedWord: false }));
    }
  };
  useEffect(() => {
    generateWord().then((words) => {
      setWordSet(words.wordset);
      setCorrectWord(words.todaysWord);
    });
  }, []);
  // const correctWord = "right";
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <Appcontext.Provider
        value={{
          board,
          setBoard,
          currentattempt,
          setCurrentattempt,
          onSelect,
          onEnter,
          onDelete,
          correctWord,
          disabledletters,
          setDisabledletters,
          gameOver,
          almostletters,
          setAlmostletters,
          correctletters,
          setCorrectletters,
          setGameOver,
        }}
      >
        <div className="game">
          <Board />
          {gameOver.gameOver ? <Gameover /> : <KeyBoard />}
        </div>
      </Appcontext.Provider>
    </div>
  );
}

export default App;
