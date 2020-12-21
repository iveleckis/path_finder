const board_dom = document.querySelector(".board");
let node_selected = "start";
let arrayCopy = [];
let xLength = 40;
let yLength = 40;

const createInitialBoard = (rows, cols) => {
  const board = [];
  for (let y = 0; y < rows; y++) {
    const row = [];
    for (let x = 0; x < cols; x++) {
      row.push({
        xCoord: x,
        yCoord: y,
        value: 0,
        checked: false,
      });
    }
    board.push(row);
  }
  generateBoardInDom(board);
  document.querySelector(".board_title").innerHTML = `Board: ${cols} x ${rows}`;
};

const random_dots = () => {
  for (let y in arrayCopy) {
    for (let x in arrayCopy[y]) {
      const rand = Math.floor(Math.random() * 3);
      if (
        arrayCopy[y][x].value !== "end" &&
        arrayCopy[y][x].value !== "start" &&
        rand === 1
      ) {
        board_dom.children[y].children[x].classList.add("black");
        arrayCopy[y][x].value = "wall";
      }
    }
  }
};

const generateBoardInDom = (array) => {
  arrayCopy = [...array];
  for (let y in array) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let x in array[y]) {
      const col = document.createElement("div");
      col.classList.add("col");
      col.addEventListener("click", () => {
        if (node_selected === "start") {
          arrayCopy[y][x].value = 1;
          col.classList.add("blue");
        } else if (node_selected === "end") {
          arrayCopy[y][x].value = "end";
          col.classList.add("red");
        } else if (node_selected === "wall") {
          arrayCopy[y][x].value = "wall";
          col.classList.add("black");
        }
      });
      row.appendChild(col);
    }
    board_dom.appendChild(row);
  }
  changeNode(node_selected);
};

const changeNode = (node) => {
  node_selected = node;
  const options = document.querySelector(".options").children;

  for (let i in options) {
    if (options[i].innerHTML === node_selected) {
      options[i].classList.add("active");
    } else {
      if (options[i].className === "option active") {
        options[i].classList.remove("active");
      }
    }
  }
};

const searchForOne = () => {
  let count = 0;
  for (let y = 0; y < arrayCopy.length; y++) {
    for (let x = 0; x < arrayCopy.length; x++) {
      if (arrayCopy[y][x].value === 1) {
        count++;
        if (arrayCopy[y + 1] && arrayCopy[y + 1][x].value === 0) {
          arrayCopy[y + 1][x].value = "new";
        } else if (arrayCopy[y + 1] && arrayCopy[y + 1][x].value === "end") {
          return true;
        }
        if (arrayCopy[y - 1] && arrayCopy[y - 1][x].value === 0) {
          arrayCopy[y - 1][x].value = "new";
        } else if (arrayCopy[y - 1] && arrayCopy[y - 1][x].value === "end") {
          return true;
        }
        if (arrayCopy[y][x - 1] && arrayCopy[y][x - 1].value === 0) {
          arrayCopy[y][x - 1].value = "new";
        } else if (arrayCopy[y][x - 1] && arrayCopy[y][x - 1].value === "end") {
          return true;
        }
        if (arrayCopy[y][x + 1] && arrayCopy[y][x + 1].value === 0) {
          arrayCopy[y][x + 1].value = "new";
        } else if (arrayCopy[y][x + 1] && arrayCopy[y][x + 1].value === "end") {
          return true;
        }
        arrayCopy[y][x].value = 2;
      }
    }
  }
  findNew();
  if (count === 0) {
    return true;
  } else {
    incrementAll();
  }
};

const findNew = () => {
  for (let y = 0; y < arrayCopy.length; y++) {
    for (let x = 0; x < arrayCopy.length; x++) {
      if (arrayCopy[y][x].value === "new") {
        arrayCopy[y][x].value = 1;
        board_dom.children[y].children[x].classList.add("green");
      }
    }
  }
};

const startSearch = () => {
  let stop;
  const interval = setInterval(() => {
    stop = searchForOne();
    if (stop) {
      clearInterval(interval);
      findShortestPath();
    }
  }, 50);
};

const incrementAll = (onlyOnes) => {
  for (let y = 0; y < arrayCopy.length; y++) {
    for (let x = 0; x < arrayCopy.length; x++) {
      if (
        arrayCopy[y][x].value !== "end" &&
        arrayCopy[y][x].value > 1 &&
        !onlyOnes
      ) {
        arrayCopy[y][x].value++;
      }
      if (onlyOnes && arrayCopy[y][x].value === 1) {
        arrayCopy[y][x].value++;
      }
    }
  }
};

const path = [];

const findShortestPath = () => {
  const max = [];
  for (let y = 0; y < arrayCopy.length; y++) {
    for (let x = 0; x < arrayCopy.length; x++) {
      if (typeof arrayCopy[y][x].value === "number")
        max.push(arrayCopy[y][x].value);
    }
  }
  const maxVal = Math.max(...max);
  for (let y = 0; y < arrayCopy.length; y++) {
    for (let x = 0; x < arrayCopy.length; x++) {
      if (arrayCopy[y][x].value === maxVal) {
        arrayCopy[y][x].checked = true;
        path.push(arrayCopy[y][x]);
        board_dom.children[y].children[x].classList.add("orange");
      }
    }
  }
  incrementAll(true);

  /* const interval = setInterval(() => {
      const result = drawPath();
      if (result) {
        clearInterval(interval);
      }
    }, 100); */
  let i = 0;
  while (i < 1) {
    const result = drawPath();
    if (result) {
      for (let y = 0; y < arrayCopy.length; y++) {
        for (let x = 0; x < arrayCopy[y].length; x++) {
          board_dom.children[y].children[x].classList.remove("green");
        }
      }
      i = 1;
    }
  }
};

const drawPath = () => {
  let whileCount = 0;
  while (whileCount < 1) {
    for (let y = 0; y < arrayCopy.length; y++) {
      let breakLoop;
      for (let x = 0; x < arrayCopy[y].length; x++) {
        if (path[path.length - 1] === arrayCopy[y][x]) {
          if (
            arrayCopy[y - 1] &&
            arrayCopy[y - 1][x].checked === false &&
            arrayCopy[y - 1][x].value === path[path.length - 1].value - 1
          ) {
            board_dom.children[y - 1].children[x].classList.add("orange");
            path.push(arrayCopy[y - 1][x]);
            breakLoop = true;

            break;
          } else if (
            arrayCopy[y][x + 1] &&
            arrayCopy[y][x + 1].checked === false &&
            arrayCopy[y][x + 1].value === path[path.length - 1].value - 1
          ) {
            board_dom.children[y].children[x + 1].classList.add("orange");
            path.push(arrayCopy[y][x + 1]);
            breakLoop = true;

            break;
          } else if (
            arrayCopy[y + 1] &&
            arrayCopy[y + 1][x].checked === false &&
            arrayCopy[y + 1][x].value === path[path.length - 1].value - 1
          ) {
            board_dom.children[y + 1].children[x].classList.add("orange");
            path.push(arrayCopy[y + 1][x]);
            breakLoop = true;

            break;
          } else if (
            arrayCopy[y][x - 1] &&
            arrayCopy[y][x - 1].checked === false &&
            arrayCopy[y][x - 1].value === path[path.length - 1].value - 1
          ) {
            board_dom.children[y].children[x - 1].classList.add("orange");
            path.push(arrayCopy[y][x - 1]);
            breakLoop = true;

            break;
          } else {
            if (arrayCopy[y - 1] && arrayCopy[y - 1][x].value === "end") {
              return true;
            }
            if (arrayCopy[y][x + 1] && arrayCopy[y][x + 1].value === "end") {
              return true;
            }
            if (arrayCopy[y][x - 1] && arrayCopy[y][x - 1].value === "end") {
              return true;
            }
            if (arrayCopy[y + 1] && arrayCopy[y + 1][x].value === "end") {
              return true;
            }
            arrayCopy[y][x].checked = true;
            board_dom.children[y].children[x].classList.remove("orange");
            path.pop();
            whileCount = 1;
          }
        }
      }
      if (breakLoop) {
        break;
      }
    }
  }
};

createInitialBoard(yLength, xLength);
