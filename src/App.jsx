import React, { createContext, useState, useEffect } from "react";
import "./App.css";
import Board from "./components/Board.jsx";
import KeyBoard from "./components/KeyBoard.jsx";
import { boardDefault } from "./Words";
import { generateWord } from "./Words";
import Gameover from "./components/Gameover";
import Swal from "sweetalert2";
import Monofoundbackdrop from "./components/Monofoundbackdrop";
import Modalfound from "./components/Modalfound";
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
  const [wordnotfound, setWordnotfound] = useState(false);
  const [flagnum, setFlagnum] = useState(0);
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
    if (
      wordSet.has(`${curword.toLowerCase()}\r`) || // for working out to github deploying we would do this way
      wordSet.has(curword.toLowerCase())
    ) {
      setCurrentattempt((pre) => ({
        ...pre,
        letterpos: 0,
        attempt: currentattempt.attempt + 1,
      }));
    } else {
      setWordnotfound((pre) => true);
    }
    if (
      curword.toLowerCase() === correctWord.toLowerCase() ||
      `${curword.toLowerCase()}\r` === correctWord.toLowerCase()
    ) {
      setGameOver((pre) => ({ ...pre, gameOver: true, guessedWord: true }));
      setFlagnum((pre) => 2 * pre);
    }
    if (
      currentattempt.attempt === 5 &&
      (wordSet.has(curword.toLowerCase()) ||
        wordSet.has(`${curword.toLowerCase()}\r`))
    ) {
      setGameOver((pre) => ({ ...pre, gameOver: true, guessedWord: false }));
      setFlagnum((pre) => 2 * pre + 1);
    }
  };
  useEffect(() => {
    generateWord().then((words) => {
      setWordSet(words.wordset);
      setCorrectWord(words.todaysWord);
    });
  }, []);
  // const correctWord = "right";
  const backdrophandle = () => {
    const newboard = [...board];
    newboard[currentattempt.attempt] = ["", "", "", "", ""];
    setWordnotfound((pre) => false);
    setBoard((pre) => newboard);
    setCurrentattempt((pre) => ({
      ...pre,
      letterpos: 0,
    }));
  };
  return (
    <>
      {wordnotfound && <Monofoundbackdrop show={backdrophandle} />}

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
            wordnotfound,
            backdrophandle,
            flagnum,
            setFlagnum,
          }}
        >
          <div className="game">
            <Modalfound />
            <Board />
            <Gameover />
            {gameOver.gameOver ? "" : <KeyBoard />}
          </div>
        </Appcontext.Provider>
      </div>
    </>
  );
}

export default App;
