import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { generateGrid, isBomb,isRevealed, TileStatus } from "./Minesweeper";

import "./styles.css";

const ROWS = 5;
const COLUMS = 5;
const MINES = 4;


function MinesweeperUI() {
  //expensive initial state
  const [grid, setGrid] = useState(() => generateGrid(MINES, ROWS, COLUMS));
  const [gameOver, setGameOver]= useState(false);

  console.log(grid);
  const handleChange = (row, column, event) => {
    let copy = [...grid];
    copy[row][column].hidden = TileStatus.REVEALED;
    console.log(copy[row][column], event.target.value);
    setGrid(copy);
  };

  const sayGameOver=()=>{
    alert("game over")
    setGameOver(true) //revealBoard
  }

  const gameBoard = grid.map((row, rowIndex) => (
    <div key={rowIndex} className="row">
      {row.map((box, columnIndex) => (
        <div
          className={"box" }
          key={columnIndex}
          onClick={(e) => {
            
            if(isBomb(box)) 
             { sayGameOver() }
             
            if(!gameOver)
            { handleChange(rowIndex, columnIndex, e);}
          }}
        >
          {!gameOver && box.hidden === TileStatus.HIDDEN 
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
