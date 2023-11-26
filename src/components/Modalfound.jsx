import React, { useCallback, useContext } from "react";
import { VscError } from "react-icons/vsc";
import { Appcontext } from "../App";
import Monofoundbackdrop from "./Monofoundbackdrop";
function Modalfound() {
  const { backdrophandle, wordnotfound } = useContext(Appcontext);
  const closingmodal = useCallback(() => {
    backdrophandle();
  }, [wordnotfound]);
  return (
    <>
      {wordnotfound && <Monofoundbackdrop show={backdrophandle} />}
      <div className={`modalfound ${wordnotfound ? "scale" : ""}`}>
        <div className="icon">
          <VscError />
        </div>
        <div>
          <h1>Oops...</h1>
        </div>
        <h3>Word not Found! Please Try Again</h3>
        <div className="ok-modal" onClick={closingmodal}>
          <span>OK</span>
        </div>
      </div>
    </>
  );
}

export default Modalfound;
