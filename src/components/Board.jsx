import React from "react";
import Letter from "./Letter";
function Board() {
  return (
    <>
      <div className="board">
        <div className="row">
          <Letter letterpos={0} attemptval={0} />
          <Letter letterpos={1} attemptval={0} />
          <Letter letterpos={2} attemptval={0} />
          <Letter letterpos={3} attemptval={0} />
          <Letter letterpos={4} attemptval={0} />
        </div>
        <div className="row">
          <Letter letterpos={0} attemptval={1} />
          <Letter letterpos={1} attemptval={1} />
          <Letter letterpos={2} attemptval={1} />
          <Letter letterpos={3} attemptval={1} />
          <Letter letterpos={4} attemptval={1} />
        </div>
        <div className="row">
          <Letter letterpos={0} attemptval={2} />
          <Letter letterpos={1} attemptval={2} />
          <Letter letterpos={2} attemptval={2} />
          <Letter letterpos={3} attemptval={2} />
          <Letter letterpos={4} attemptval={2} />
        </div>
        <div className="row">
          <Letter letterpos={0} attemptval={3} />
          <Letter letterpos={1} attemptval={3} />
          <Letter letterpos={2} attemptval={3} />
          <Letter letterpos={3} attemptval={3} />
          <Letter letterpos={4} attemptval={3} />
        </div>
        <div className="row">
          <Letter letterpos={0} attemptval={4} />
          <Letter letterpos={1} attemptval={4} />
          <Letter letterpos={2} attemptval={4} />
          <Letter letterpos={3} attemptval={4} />
          <Letter letterpos={4} attemptval={4} />
        </div>
        <div className="row">
          <Letter letterpos={0} attemptval={5} />
          <Letter letterpos={1} attemptval={5} />
          <Letter letterpos={2} attemptval={5} />
          <Letter letterpos={3} attemptval={5} />
          <Letter letterpos={4} attemptval={5} />
        </div>
      </div>
    </>
  );
}
export default Board;
