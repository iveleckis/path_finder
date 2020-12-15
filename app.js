const board_dom = document.querySelector('.board');
let node_selected = 'start';
let arrayCopy = [];

const createInitialBoard = (rows, cols) => {
    const board = [];
    for (let y = 0; y < rows; y++) {
        const row = [];
        for (let x = 0; x < cols; x++) {
            row.push({ x, y, value: 0 });
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
                    arrayCopy[y][x].value = 'start';
                    col.classList.add('green');
                } else if (node_selected === 'end') {
                    arrayCopy[y][x].value = 'end';
                    col.classList.add('red');
                }
            });
            row.appendChild(col);
        }
        board_dom.appendChild(row);
    }
};

const updateBoard = () => {};

const changeNode = (node) => {
    node_selected = node;
};

const search = () => {
    for (let y in arrayCopy) {
        let breakLoop = false;
        for (let x in arrayCopy[y]) {
            // kazkodel error meta apacioj nes neranda sito nors su ifu saugausi
            // kazkodel su x asim pykstasi
            if (
                arrayCopy[y][x].value === 1 ||
                arrayCopy[y][x].value === 'start'
            ) {
                if (Number(y) >= 1) {
                    arrayCopy[Number(y) - 1][x].value =
                        arrayCopy[Number(y) - 1][x].value + 1;
                }
                if (Number(y) <= 3) {
                    arrayCopy[Number(y) + 1][x].value =
                        arrayCopy[Number(y) + 1][x].value + 1;
                }
                if (Number(x) >= 1) {
                    arrayCopy[y][Number(x) + 1].value =
                        arrayCopy[y][Number(x) + 1].value + 1;
                }
                if (Number(x) <= 3) {
                    arrayCopy[y][Number(x) - 1].value =
                        arrayCopy[y][Number(x) - 1].value + 1;
                }
                if (arrayCopy[y][x].value === 'start') {
                    arrayCopy[y][x].value = 2;
                } else {
                    arrayCopy[y][x].value = arrayCopy[y][x].value + 1;
                }
                breakLoop = true;
                if (breakLoop) {
                    break;
                }
            }
        }
        if (breakLoop) {
            break;
        }
    }
    console.log(arrayCopy);
};

const startSearch = () => {
    search();
};

createInitialBoard(5, 5);
