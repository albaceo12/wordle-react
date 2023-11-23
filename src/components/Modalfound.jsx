import React, { useCallback, useContext } from "react";
import { VscError } from "react-icons/vsc";
import { Appcontext } from "../App";

function Modalfound() {
  const { backdrophandle, wordnotfound } = useContext(Appcontext);
  const closingmodal = useCallback(() => {
    backdrophandle();
  }, [wordnotfound]);
  return (
    <div className={`modalfound ${wordnotfound ? "scale" : ""}`}>
      <div className="icon">
        <VscError />
      </div>
      <div>
        <h1>Oops...</h1>
      </div>
      <h3>Word not Found! Please Try Again</h3>
      <div className="ok-modal" onMouseDown={closingmodal}>
        <span>OK</span>
      </div>
    </div>
  );
}

export default Modalfound;
