function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  export enum TileStatus {
    EMPTY = 0,
    HIDDEN = "hidden",
    NUMBER = "number",
    MINE = 9,
    REVEAL = "reveal"
  } 
  
  function isBomb(cell) {
    return cell === TileStatus.MINE;
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
  
  const adiacentBoxIndexesInsideGrid = (i, j, rows, columns) => {
    let arrOfIndexesInsideGrid = [
      //first line
      [i - 1, j - 1],
      [i - 1, j],
      [i - 1, j + 1],
      //second line
      [i, j - 1],
      [i, j + 1],
      //third line
      [i + 1, j - 1],
      [i + 1, j],
      [i + 1, j + 1]
    ];
  
    //filter elements not inside the grid
    return arrOfIndexesInsideGrid.filter(
      (el) => el[0] > 0 && el[1] > 0 && el[0] < rows && el[1] < columns
    );
  };
  
  export function generateGrid(minesCount = 3, rows = 5, colums = 5) {
    //generate grid
    //calc adiacentBox // border or not border
    let g = [],
      hidden = [];
  
    for (let i = 0; i < rows; i++) {
      g[i] = new Array(colums).fill(0);
      // hidden[i] = new Array(colums).fill(TileStatus.HIDDEN);
    }
  
    let minesAssigned = 0;
    while (minesAssigned < minesCount) {
      //mines 3
      // console.table(g, "mines", minesAssigned);
      const x = getRandomInt(rows);
      const y = getRandomInt(colums);
      if (g[x][y] !== TileStatus.MINE) {
        g[x][y] = TileStatus.MINE;
        minesAssigned += 1;
      }
    }
    // precalculate nhood for non bombs CELLs
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < colums; j++) {
        if (g[i][j] === TileStatus.MINE) {
          break;
        }
        //if i=0 or i=rown //missing  top or button
        //if j=0 or j=coln //missing left or rignt
        // (i,j, rows, columns) => [valid box elements] => filter (i,j => g[i][j] ===)
        g[i][j] = adiacentBoxIndexesInsideGrid(i, j, rows, colums).filter((e) =>
          isBomb(g[e[0]][e[1]])
        ).length;
      }
    }
  
    return g;
  }
  