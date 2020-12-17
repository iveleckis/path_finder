const board_dom = document.querySelector('.board');
let node_selected = 'start';
let arrayCopy = [];
let xLength = 25;
let yLength = 25;

const createInitialBoard = (rows, cols) => {
    const board = [];
    for (let y = 0; y < rows; y++) {
        const row = [];
        for (let x = 0; x < cols; x++) {
            row.push({
                xCoord: x,
                yCoord: y,
                value: 0,
            });
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
                    arrayCopy[y][x].value = 1;
                    col.classList.add('green');
                } else if (node_selected === 'end') {
                    arrayCopy[y][x].value = 'end';
                    col.classList.add('red');
                } else if (node_selected === 'wall') {
                    arrayCopy[y][x].value = 'wall';
                    col.classList.add('black');
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

const searchForOne = () => {
    console.log('hello');

    let count = 0;
    for (let y = 0; y < arrayCopy.length; y++) {
        for (let x = 0; x < arrayCopy.length; x++) {
            if (y > 0 && y < yLength - 1 && x > 0 && x < xLength - 1) {
                if (arrayCopy[y][x].value === 1) {
                    if (arrayCopy[y + 1][x].value === 0) {
                        arrayCopy[y + 1][x].value = 'new';
                    }
                    if (arrayCopy[y - 1][x].value === 0) {
                        arrayCopy[y - 1][x].value = 'new';
                    }
                    if (arrayCopy[y][x - 1].value === 0) {
                        arrayCopy[y][x - 1].value = 'new';
                    }
                    if (arrayCopy[y][x + 1].value === 0) {
                        arrayCopy[y][x + 1].value = 'new';
                    }

                    //board_dom.children[y].children[x].innerHTML = 2;
                    count++;
                    // JEI COUNT === 0 tada reik kazkaip uzpildyt kampus
                    arrayCopy[y][x].value = 2;
                }
            }
        }
    }
    console.log(count);
    if (count === 0) {
        return true;
    } else {
        findNew();
    }
};

const findNew = () => {
    for (let y = 0; y < arrayCopy.length; y++) {
        for (let x = 0; x < arrayCopy.length; x++) {
            if (arrayCopy[y][x].value === 'new') {
                arrayCopy[y][x].value = 1;
                //board_dom.children[y].children[x].innerHTML = 1;
                board_dom.children[y].children[x].classList.add('green');
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
        }
    }, 100);
};

createInitialBoard(xLength, yLength);
