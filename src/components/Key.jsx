import React, { useContext } from "react";
import { Appcontext } from "../App";
function Key({ Keyval, bigkey, disabled, correctletters, almostletter }) {
  const { onSelect, onEnter, onDelete } = useContext(Appcontext);
  const selectletter = () => {
    if (Keyval === "ENTER") {
      onEnter();
    } else if (Keyval === "DELETE") {
      onDelete();
    } else {
      onSelect(Keyval);
    }
  };
  return (
    <div
      className="key"
      id={
        bigkey
          ? "big"
          : disabled
          ? "disabled"
          : almostletter && !correctletters
          ? "almost"
          : correctletters
          ? "correct"
          : ""
      }
      onClick={selectletter}
    >
      {Keyval}
    </div>
  );
}
export default Key;
