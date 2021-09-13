import React from "react";
import ReactDOM from "react-dom";
import { assignMines } from "./Minesweeper";

import "./styles.css";

function isBomb(cellNum) {
  return cellNum === 9;
}
function MinesweeperUI() {
  // const [grid, setGrid]= useState([[]])

  const board = assignMines(4, 5, 5);
  const gameBoard = board.map((row) => (
    <div className="row">
      {row.map((box) => (
        <div className={`box`}>{box}</div>
      ))}
    </div>
  ));

  return (
    <div className="App">
      <h1>Minesweeper</h1>
      <div className="gameBoard">{gameBoard}</div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<MinesweeperUI />, rootElement);
