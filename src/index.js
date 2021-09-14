import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { generateGrid, TileStatus } from "./Minesweeper";

import "./styles.css";

const ROWS = 5;
const COLUMS = 5;
const MINES = 4;


function MinesweeperUI() {
  //expensive initial state
  const [grid, setGrid] = useState(() => generateGrid(MINES, ROWS, COLUMS));

  console.log(grid);
  const handleChange = (row, column, event) => {
    let copy = [...grid];
    copy[row][column].hidden = TileStatus.REVEALED;
    console.log(copy[row][column], event.target.value);
    setGrid(copy);
  };

  const gameBoard = grid.map((row, rowIndex) => (
    <div key={rowIndex} className="row">
      {row.map((box, columnIndex) => (
        <div
          className={`box`}
          key={columnIndex}
          onClick={(e) => handleChange(rowIndex, columnIndex, e)}
        >
          {box.hidden === TileStatus.HIDDEN
            ? box.hidden
            : box.value}
        </div>
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
