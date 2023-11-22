import React, { useCallback, useEffect, useContext } from "react";
import { Appcontext } from "../App";
import { v4 as uuidv4 } from "uuid";
import Key from "./Key";
function KeyBoard() {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];
  const {
    onSelect,
    onEnter,
    onDelete,
    currentattempt,
    disabledletters,
    almostletters,
    correctletters,
  } = useContext(Appcontext);
  const handlekeydown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        onEnter();
      } else if (event.key === "Backspace") {
        onDelete();
      } else {
        keys1.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelect(key);
          }
        });
        keys2.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelect(key);
          }
        });
        keys3.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelect(key);
          }
        });
      }
    },
    [currentattempt]
  );
  // console.log(handlekeydown);
  useEffect(() => {
    document.addEventListener("keydown", handlekeydown);

    return () => {
      document.removeEventListener("keydown", handlekeydown);
    };
  }, [handlekeydown]);
  return (
    <div className="keyboard">
      <div className="line1">
        {keys1.map((key) => (
          <Key
            key={uuidv4()}
            Keyval={key}
            disabled={disabledletters.includes(key)}
            almostletter={almostletters.includes(key)}
            correctletters={correctletters.includes(key)}
          >
            {key}
          </Key>
        ))}
      </div>
      <div className="line2">
        {" "}
        {keys2.map((key) => (
          <Key
            key={uuidv4()}
            Keyval={key}
            disabled={disabledletters.includes(key)}
            almostletter={almostletters.includes(key)}
            correctletters={correctletters.includes(key)}
          >
            {key}
          </Key>
        ))}
      </div>
      <div className="line3">
        <Key Keyval={"ENTER"} bigkey />
        {keys3.map((key) => (
          <Key
            key={uuidv4()}
            Keyval={key}
            disabled={disabledletters.includes(key)}
            almostletter={almostletters.includes(key)}
            correctletters={correctletters.includes(key)}
          >
            {key}
          </Key>
        ))}
        <Key Keyval={"DELETE"} bigkey />
      </div>
    </div>
  );
}
export default KeyBoard;
