function drawRat() {
  const img = document.getElementById("rat");
  const maze = document.getElementById("mazeConteiner");
  img.style = "display:visible";
  maze.style = "display:none";
}
function resetRat() {
  const img = document.getElementById("rat");
  const maze = document.getElementById("mazeConteiner");
  img.style = "display:none";
  maze.style = "display:visible";
}

function drawMaze() {
  // using randomized Prim's algorithm

  // prepering canvas and reseting it
  const canvas = document.getElementById("maze");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // getting needed variables
  const numBlock = document.getElementById("numBlockInput").value; // number of block in one row/column
  const wallSize = document.getElementById("maze").width / numBlock;
  // Reseting game
  document.getElementById("player").style = "display:none";
  document.getElementById("end").style = "display:none";
  document.getElementById("bttStart").value = "Start game";

  if (canvas.getContext) {
    // checking if canvas is working
    let grid = [];
    // making of matrix
    for (let i = 0; i < numBlock; i++) {
      grid[i] = [];
      for (let j = 0; j < numBlock; j++) {
        ctx.fillStyle = "black";
        ctx.fillRect(i * wallSize, j * wallSize, wallSize, wallSize);
        grid[i][j] = {
          value: 1, // 1 is wall 0 is path
          partOfSet: false, // value for algorithm
          positionX: i,
          positionY: j,
          currentCell: false,
        };
      }
    }

    //choosing random starting cell from grid
    const numberX = Math.round(Math.random() * (numBlock - 1));
    const numberY = Math.round(Math.random() * (numBlock - 1));
    //adding it to path
    grid[numberX][numberY].value = 0;
    grid[numberX][numberY].currentCell = true;
    ctx.fillStyle = "white";
    ctx.fillRect(
      numberX * wallSize + 0.1 * wallSize,
      numberY * wallSize + 0.1 * wallSize,
      wallSize * 0.8,
      wallSize * 0.8
    );

    function neighbors() {
      // find neighbors of current cell

      //Finding current cell
      for (let i = 0; i < numBlock; i++) {
        for (let j = 0; j < numBlock; j++) {
          if (grid[i][j].currentCell === true) {
            Cell = grid[i][j];
          }
        }
      }
      Cell.currentCell = false;

      const varY = Cell.positionY;
      const varX = Cell.positionX;

      // Adding neighbors to partOfSet
      if (varX !== 0 && grid[varX - 1][varY].value === 1) {
        grid[varX - 1][varY].partOfSet = true;
      }
      if (varX < numBlock - 1 && grid[varX + 1][varY].value === 1) {
        grid[varX + 1][varY].partOfSet = true;
      }
      if (varY !== 0 && grid[varX][varY - 1].value === 1) {
        grid[varX][varY - 1].partOfSet = true;
      }
      if (varY < numBlock - 1 && grid[varX][varY + 1].value === 1) {
        grid[varX][varY + 1].partOfSet = true;
      }
    }

    function nextCell() {
      // making array of neighbors (cells that can be used)
      let tempArr = [];
      for (let i = 0; i < numBlock; i++) {
        for (let j = 0; j < numBlock; j++) {
          if (grid[i][j].partOfSet) {
            tempArr.push(grid[i][j]);
          }
        }
      }
      //choosing next cell from neighbors
      let number = Math.round(Math.random() * (tempArr.length - 1));
      tempArr[number].value = 0;
      tempArr[number].currentCell = true;
      tempArr[number].partOfSet = false;
      const posX = tempArr[number].positionX;
      const posY = tempArr[number].positionY;

      //Randomizing direction for connecting to existing path
      let ArrDirection = [0, 1, 2, 3];
      for (let i = ArrDirection.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ArrDirection[i], ArrDirection[j]] = [ArrDirection[j], ArrDirection[i]];
      }
      //drawing connection to existing path
      for (let i = 0; i < 4; i++) {
        switch (ArrDirection[i]) {
          case 0:
            if (posX !== numBlock - 1 && grid[posX + 1][posY].value === 0) {
              ctx.fillRect(
                posX * wallSize + 0.1 * wallSize,
                posY * wallSize + 0.1 * wallSize,
                wallSize * 1.2,
                wallSize * 0.8
              );
              i = 4;
            }
            break;
          case 1:
            if (posX !== 0 && grid[posX - 1][posY].value === 0) {
              ctx.fillRect(
                posX * wallSize - 0.1 * wallSize,
                posY * wallSize + 0.1 * wallSize,
                wallSize,
                wallSize * 0.8
              );
              i = 4;
            }
            break;
          case 2:
            if (posY !== numBlock - 1 && grid[posX][posY + 1].value === 0) {
              ctx.fillRect(
                posX * wallSize + 0.1 * wallSize,
                posY * wallSize + 0.1 * wallSize,
                wallSize * 0.8,
                wallSize * 1.2
              );
              i = 4;
            }
            break;
          case 3:
            if (posY !== 0 && grid[posX][posY - 1].value === 0) {
              ctx.fillRect(
                posX * wallSize + 0.1 * wallSize,
                posY * wallSize - 0.1 * wallSize,
                wallSize * 0.8,
                wallSize
              );
              i = 4;
            }
            break;
        }
      }
    }
    function endMaze() {
      //checking if any cell in grid still isn't path
      const temp = [];
      for (let i = 0; i < numBlock; i++) {
        for (let j = 0; j < numBlock; j++) {
          if (grid[i][j].value === 1) {
            temp.push = "value";
          }
        }
      }
      if (temp.length === 0) {
        return true;
      } else {
        return false;
      }
    }
    while (endMaze()) {
      neighbors();
      nextCell(grid, ctx, wallSize, numBlock);
    }
  } else {
    alert("Canvas not supported. Change browser.");
  }
}

function showVal(newVal) {
  document.getElementById("numBlockOutput").innerHTML = newVal;
  drawMaze();
}

function startGame() {
  const canvas = document.getElementById("maze");
  const ctx = canvas.getContext("2d");
  const player = document.getElementById("player");
  const end = document.getElementById("end");

  const numBlock = document.getElementById("numBlockInput").value;

  const wallSize = document.getElementById("maze").width / numBlock;
  player.style = "display:visible";
  end.style = "display:visible";
  document.getElementById("instruction").innerHTML = "Move with arrows or WASD";
  document.getElementById("bttStart").value = "Reset game";

  // starting position
  player.style.left = 0.25 * wallSize + "px";
  player.style.top = 0.25 * wallSize + "px";
  end.style.left =
    Math.floor(0.25 * wallSize + (numBlock - 1) * wallSize) + "px";

  end.style.top =
    Math.floor(0.25 * wallSize + (numBlock - 1) * wallSize) + "px";

  // size of player /end
  player.style.width = 0.5 * wallSize + "px";
  player.style.height = 0.5 * wallSize + "px";
  end.style.width = 0.5 * wallSize + "px";
  end.style.height = 0.5 * wallSize + "px";
  //variable for checking obstacles/moving
  const A = wallSize / 2;

  let deadEnd = false;
  //preventing from scrolling window with arrow
  window.addEventListener(
    "keydown",
    function (e) {
      // space and arrow keys
      if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
      }
    },
    false
  );

  document.onkeydown = function (e) {
    // checking if key was pressed
    switch (e.keyCode) {
      case 37:
      case 65:
        //alert('left');

        colorArr = ctx.getImageData(
          parseInt(player.style.left, 10) - A,
          parseInt(player.style.top, 10),
          A,
          A
        ).data;
        for (let i = 0; i < colorArr.length; i++) {
          if (colorArr[i] === 0) {
            deadEnd = true;
          }
        }
        if (deadEnd) {
          deadEnd = false;
          break;
        } else {
          player.style.left = parseInt(player.style.left, 10) - 2 * A + "px";
          deadEnd = false;
          break;
        }
      case 38:
      case 87:
        //alert('up');
        colorArr = ctx.getImageData(
          parseInt(player.style.left, 10),
          parseInt(player.style.top, 10) - A,
          A,
          A
        ).data;
        for (let i = 0; i < colorArr.length; i++) {
          if (colorArr[i] === 0) {
            deadEnd = true;
          }
        }
        if (deadEnd) {
          deadEnd = false;
          break;
        } else {
          player.style.top = parseInt(player.style.top, 10) - 2 * A + "px";
          deadEnd = false;
          break;
        }

      case 39:
      case 68:
        //alert('right');
        colorArr = ctx.getImageData(
          parseInt(player.style.left, 10) + A,
          parseInt(player.style.top, 10),
          A,
          A
        ).data;
        for (let i = 0; i < colorArr.length; i++) {
          if (colorArr[i] === 0) {
            deadEnd = true;
          }
        }
        if (deadEnd) {
          deadEnd = false;
          break;
        } else {
          player.style.left = parseInt(player.style.left, 10) + 2 * A + "px";
          deadEnd = false;
          break;
        }
      case 40:
      case 83:
        //alert('down');
        colorArr = ctx.getImageData(
          parseInt(player.style.left, 10),
          parseInt(player.style.top, 10) + A,
          A,
          A
        ).data;
        for (let i = 0; i < colorArr.length; i++) {
          if (colorArr[i] === 0) {
            deadEnd = true;
          }
        }
        if (deadEnd) {
          deadEnd = false;
          break;
        } else {
          player.style.top = parseInt(player.style.top, 10) + 2 * A + "px";
          deadEnd = false;
          break;
        }
    }
  };

  document.onkeyup = function () {
    if (
      player.style.left === end.style.left &&
      player.style.top === end.style.top
    ) {
      alert("Win");
      drawMaze();
    }
  };
}
