import React, { createContext, useState, useEffect, useCallback } from "react";
import "./App.css";
import Board from "./components/Board.jsx";
import KeyBoard from "./components/KeyBoard.jsx";
import { boardDefault } from "./Words";
import { generateWord } from "./Words";
import Gameover from "./components/Gameover";
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
  const [closeresult, setCloseresult] = useState(false);
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
      // console.log("ttt");
      setCurrentattempt((pre) => ({
        ...pre,
        letterpos: 0,
        attempt: currentattempt.attempt + 1,
      }));
    } else {
      setWordnotfound((pre) => true);
      // console.log("zzz");
      return true;
    }
    if (
      correctWord.toLowerCase().includes(curword.toLowerCase())
      // `${curword.toLowerCase()}\r`.includes(correctWord.toLowerCase())
    ) {
      // console.log("fff");
      setGameOver((pre) => ({ ...pre, gameOver: true, guessedWord: true }));
      setFlagnum((pre) => 2 * pre);
    }
    if (
      currentattempt.attempt === 5 &&
      !correctWord.toLowerCase().includes(curword.toLowerCase())
      // !correctWord.toLowerCase().includes(`${curword.toLowerCase()}\r`))
      // !wordnotfound
    ) {
      // console.log("shshsh");
      setGameOver((pre) => ({ ...pre, gameOver: true, guessedWord: false }));
      setFlagnum((pre) => 2 * pre + 1);
    }
  };
  useEffect(() => {
    // console.log(closeresult);
    generateWord().then((words) => {
      setWordSet(words.wordset);
      setCorrectWord(words.todaysWord);
    });
  }, [closeresult]);
  // const correctWord = "chock";
  const backdrophandle = useCallback(() => {
    const newboard = [...board];
    newboard[currentattempt.attempt] = ["", "", "", "", ""];
    setWordnotfound((pre) => false);
    setBoard((pre) => newboard);
    setCurrentattempt((pre) => ({
      ...pre,
      letterpos: 0,
    }));
  }, [wordnotfound]);
  return (
    <>
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
            closeresult,
            setCloseresult,
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
