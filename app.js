const board_dom = document.querySelector(".board");
let node_selected = "start";

const createInitialBoard = (rows, cols) => {
  const board = [];
  for (let y = 0; y < rows; y++) {
    const row = [];
    for (let x = 0; x < cols; x++) {
      row.push({ x, y });
    }
    board.push(row);
  }
  generateBoardInDom(board);
  document.querySelector(".board_title").innerHTML = `Board: ${cols} x ${rows}`;
};

const generateBoardInDom = (array) => {
  for (let y in array) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let x in array[y]) {
      const col = document.createElement("div");
      col.classList.add("col");
      col.addEventListener("click", () => {
        if (node_selected === "start") {
          for (let a in board_dom.children) {
            for (let z in board_dom.children[a].children) {
              if (board_dom.children[a].children[z].innerHTML === "S") {
                board_dom.children[a].children[z].innerHTML = "";
              }
            }
          }
          col.innerHTML = "S";
          col.classList.add("green");
        } else if (node_selected === "end") {
          for (let a in board_dom.children) {
            for (let z in board_dom.children[a].children) {
              if (board_dom.children[a].children[z].innerHTML === "E") {
                board_dom.children[a].children[z].innerHTML = "";
              }
            }
          }
          col.innerHTML = "E";
          col.classList.add("red");
        } else if (node_selected === "stop") {
          let stopsCount = 0;
          for (let a in board_dom.children) {
            for (let z in board_dom.children[a].children) {
              if (board_dom.children[a].children[z].innerHTML === "X") {
                stopsCount++;
              }
            }
          }
          if (stopsCount < 3) {
            col.innerHTML = "X";
            col.classList.add("yellow");
          }
        }
      });
      row.appendChild(col);
    }
    board_dom.appendChild(row);
  }
};

const changeNode = (node) => {
  node_selected = node;
};

const search = () => {
  let start = "";
  const stops = [];
  let end = "";

  for (let x in board_dom.children) {
    for (let z in board_dom.children[x].children) {
      if (board_dom.children[x].children[z].innerHTML === "S") {
        start = `x${z}y${x}`;
      } else if (board_dom.children[x].children[z].innerHTML === "X") {
        stops.push(`x${z}y${x}`);
      } else if (board_dom.children[x].children[z].innerHTML === "E") {
        end = {
          x: Number(z),
          y: Number(x),
        };
      }
    }
  }

  const allStartPoints = [];

  for (let x in board_dom.children) {
    for (let z in board_dom.children[x].children) {
      if (board_dom.children[x].children[z].innerHTML === "S") {
        const coordinatesPlusY = {
          x: Number(z),
          y: Number(x) - 1,
        };
        const coordinatesMinusY = {
          x: Number(z),
          y: Number(x) + 1,
        };
        const coordinatesMinusX = {
          x: Number(z) - 1,
          y: Number(x),
        };
        const coordinatesPlusX = {
          x: Number(z) + 1,
          y: Number(x),
        };

        allStartPoints.push(coordinatesMinusX);
        allStartPoints.push(coordinatesPlusX);
        allStartPoints.push(coordinatesMinusY);
        allStartPoints.push(coordinatesPlusY);
      }
    }
  }

  for (let x in board_dom.children) {
    for (let z in board_dom.children[x].children) {
      for (let y in allStartPoints) {
        if (
          allStartPoints[y].x == z &&
          allStartPoints[y].y == x &&
          board_dom.children[x].children[z].innerHTML !== "E"
        ) {
          board_dom.children[x].children[z].classList.add("green");
          board_dom.children[x].children[z].innerHTML = "S";
        }
      }
    }
  }
  console.log(allStartPoints);
};

const startSearch = () => {
  // return somethin
  // then clear interval
  // when end is found
  /* setInterval(() => {
    search();
  }, 200); */
  search();
};

createInitialBoard(20, 20);

/* for (let x in board_dom.children) {
    let breakLoop = false;
    for (let z in board_dom.children[x].children) {
        if (board_dom.children[x].children[z].innerHTML === 'S') {
            board_dom.children[Number(x) + 1].children[Number(z)].innerHTML =
                'S';
            board_dom.children[Number(x) - 1].children[Number(z)].innerHTML =
                'S';
            board_dom.children[Number(x)].children[Number(z) + 1].innerHTML =
                'S';
            board_dom.children[Number(x)].children[Number(z) - 1].innerHTML =
                'S';
            board_dom.children[Number(x) + 1].children[Number(z)].classList.add(
                'white'
            );
            board_dom.children[Number(x) - 1].children[Number(z)].classList.add(
                'white'
            );
            board_dom.children[Number(x)].children[Number(z) + 1].classList.add(
                'white'
            );
            board_dom.children[Number(x)].children[Number(z) - 1].classList.add(
                'white'
            );
            breakLoop = true;
            break;
        }
    }
    if (breakLoop) break;
} */
