import { clearLine } from "readline";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  export enum TileStatus {
    EMPTY = 0,
    HIDDEN = "hidden",
    NUMBER = "number",
    MINE = 9,
    REVEALED = "reveal",
    MARKED = "flag"
  } 
  
  export function isBomb(cell) {
    return cell.value === TileStatus.MINE;
  }

  export function isRevealed(cell){
    return cell.hidden===TileStatus.REVEALED
  }
  
  export function isHidden(cell){
    return cell.hidden===TileStatus.HIDDEN
  }

  export function isEmpty(cell){
    return cell.value===TileStatus.EMPTY
  }
  /*
    FIRST PART -- LOGIC
    1.Populate board -- bombs
    2.calculate adiacent box, precalculate numbers
    
    
    SECOND PART -- UI
    1.UI grid
    2.Left click on tiles -- reveal tiles
    
    3.Right click -- mark tiles
    4.Check for win/lose
    
    */
  
  export const adiacentBoxIndexesInsideGrid = (i, j, rows, columns) => {
    let arrOfIndexesInsideGrid = [
      //first line
      {x: i - 1, y: j},
      {x: i - 1, y: j + 1},
      {x: i - 1, y: j - 1},
      //second line
      {x: i, y: j - 1},
      {x: i, y: j + 1},
      //third line
      {x: i + 1, y: j - 1},
      {x: i + 1, y: j},
      {x: i + 1, y: j + 1}
    ];
  
    //filter elements not inside the grid
    return arrOfIndexesInsideGrid.filter(
        ({x,y}) => x >= 0 && y >= 0 && x < rows && y < columns
      );
  };
  
  export function generateGrid(minesCount = 3, rows = 5, colums = 5) {
    //generate grid
    let g = [];

    for (let i = 0; i < rows; i++) {
      g[i] = Array.from({ length: colums }, (v,i) => ({ value: 0 , hidden: TileStatus.HIDDEN }));
    }

    let minesAssigned = 0;
    while (minesAssigned < minesCount) {
      const x = getRandomInt(rows);
      const y = getRandomInt(colums);
      if (g[x][y].value !== TileStatus.MINE) {
        g[x][y].value = TileStatus.MINE;
        minesAssigned += 1;
      }
    }  

    //calc adiacentBox for non bombs CELLs
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < colums; j++) {
        if (isBomb(g[i][j])) {
          break;
        }
        // (i,j, rows, columns) => [valid box elements] => filter (i,j => isBomb(g[i][j]))
        //filter box indexes outside of the array
        g[i][j].value = adiacentBoxIndexesInsideGrid(i, j, rows, colums) 
        // get only the mines 
        .filter(({x,y}) =>
          isBomb(g[x][y])
        ).length
      }
    }
  
    console.table(g.map(row => row.map(({value,hidden}) => value)))    


    return g;
  }
  

  function checkWin(){
      //if game over -- reveal board

  }
 
