import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { generateGrid, isBomb,isRevealed,isEmpty, TileStatus ,adiacentBoxIndexesInsideGrid} from "./Minesweeper";

import "./styles.css";

const ROWS = 5;
const COLUMS = 5;
const MINES = 4;


function MinesweeperUI() {
  //expensive initial state
  const [grid, setGrid] = useState(() => generateGrid(MINES, ROWS, COLUMS));
  const [gameOver, setGameOver]= useState(false);

  const handleClick = (row, column, box) => {

    if(isBomb(box)) 
    { sayGameOver() }
    
    //if isRevealed --> nothing
    //if isHidden or[isMarked]
          //if bomb --> game over
          //if isEmply --> run recursiveley for nboor
          //if isNumber

    revealCell(row,column, ROWS,COLUMS);
  };

  const sayGameOver=()=>{
    alert("game over")
    setGameOver(true) //revealBoard
  }

  const revealCell= (i,j, rows, colums)=>{
    if (isRevealed(grid[i][j])){
      return;
    }

    let copy = [...grid];
    copy[i][j].hidden = TileStatus.REVEALED;
    // console.log(copy[i][j]);

    if(isBomb(grid[i][j])){
      sayGameOver() 
    }

    if(isEmpty(grid[i][j])){
        const adiacentCells = adiacentBoxIndexesInsideGrid(i, j, rows, colums)
        // console.log(adiacentCells);
        adiacentCells.filter(({x,y}) =>
          isEmpty(grid[x][y])
        ).map( ({x,y})=> revealCell(x,y, rows, colums));
    }

    setGrid(copy);
  }

  const gameBoard = grid.map((row, rowIndex) => (
    <div key={rowIndex} className="row">
      {row.map((box, columnIndex) => (
        <div
          className={"box" }
          key={columnIndex}
          onClick={(e) => {
            if(!gameOver)
            { handleClick(rowIndex, columnIndex, box);}
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
