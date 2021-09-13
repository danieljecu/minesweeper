import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { generateGrid, TileStatus } from "./Minesweeper";

import "./styles.css";

const ROWS = 5;
const COLUMS = 5;
const MINES = 4;

const board = generateGrid(MINES, ROWS, COLUMS);

function MinesweeperUI() {
  const [grid, setGrid] = useState(
    Array.from({ length: ROWS }, () =>
      Array.from({ length: COLUMS }, () => TileStatus.HIDDEN)
    )
  );

  const handleChange = (row, column, event) => {
    let copy = [...grid];
    copy[row][column] = board[row][column];
    console.log(copy[row][column]);

    setGrid(copy);
  };

  // useEffect(() => {
  //   return;
  // }, [grid]);

  // const gameBoard = board.map((row) => (
  //   <div className="row">
  //     {row.map((box) => (
  //       <div className={`box`}>{box}</div>
  //     ))}
  //   </div>
  // ));

  const hiddenBoard = grid.map((row, rowIndex) => (
    <div key={rowIndex} className="row">
      {row.map((box, columnIndex) => (
        <div
          className="box"
          key={columnIndex}
          onClick={(e) => handleChange(rowIndex, columnIndex, e)}
        >
          {box === TileStatus.HIDDEN
            ? TileStatus.HIDDEN
            : board[rowIndex][columnIndex]}
        </div>
      ))}
    </div>
  ));

  return (
    <div className="App">
      <h1>Minesweeper</h1>
      {/* <div className="gameBoard">{gameBoard}</div> */}
      {hiddenBoard}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<MinesweeperUI />, rootElement);
