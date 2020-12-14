const board_dom = document.querySelector('.board');
let node_selected = 'start';
let arrayCopy = [];

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
    document.querySelector(
        '.board_title'
    ).innerHTML = `Board: ${cols} x ${rows}`;
};

const generateBoardInDom = (array) => {
    arrayCopy = [...array];
    for (let y in array) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let x in array[y]) {
            const col = document.createElement('div');
            col.classList.add('col');
            col.addEventListener('click', () => {
                if (node_selected === 'start') {
                    for (let a in board_dom.children) {
                        for (let z in board_dom.children[a].children) {
                            if (
                                board_dom.children[a].children[z].className &&
                                board_dom.children[a].children[z].className ===
                                    'col green'
                            ) {
                                board_dom.children[a].children[z].className =
                                    'col';
                            }
                        }
                    }
                    col.classList.add('green');
                } else if (node_selected === 'end') {
                    for (let a in board_dom.children) {
                        for (let z in board_dom.children[a].children) {
                            if (
                                board_dom.children[a].children[z].className &&
                                board_dom.children[a].children[z].className ===
                                    'col red'
                            ) {
                                board_dom.children[a].children[z].className =
                                    'col';
                            }
                        }
                    }
                    col.classList.add('red');
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
    let start = '';
    let end = '';

    for (let y in board_dom.children) {
        for (let x in board_dom.children[y].children) {
            if (board_dom.children[y].children[x].className === 'col green') {
                start = { x: Number(x), y: Number(y) };
            } else if (
                board_dom.children[y].children[x].className === 'col red'
            ) {
                end = { x: Number(x), y: Number(y) };
            }
        }
    }

    for (let y in arrayCopy) {
        for (let x in arrayCopy[y]) {
            if (
                arrayCopy[y][x].x === start.x &&
                arrayCopy[y][x].y === start.y
            ) {
                console.log('start');
                console.log(start);
            } else if (
                arrayCopy[y][x].x === end.x &&
                arrayCopy[y][x].y === end.y
            ) {
                console.log('end');
                console.log(end);
            }
        }
    }

    //const searchInterval = setInterval(() => {}, 1000);
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

createInitialBoard(5, 5);

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
