class Controls {
    constructor() {
        this.container = document.querySelector('#controls');
        this.controls = ['start', 'end', 'wall', 'find'];
        this.activeControl = this.controls[0];
    }

    setActiveControl(name) {
        this.activeControl = name;
        this.createControls();
    }

    createControls() {
        this.container.innerHTML = '';
        for (let i in this.controls) {
            const control = document.createElement('div');
            control.classList.add('control');
            this.activeControl === this.controls[i] &&
                control.classList.add('active');
            control.innerHTML = this.controls[i];
            control.addEventListener('click', () => {
                this.setActiveControl(this.controls[i]);
            });
            this.container.appendChild(control);
        }
    }
}

class Board {
    constructor(x, y) {
        this.container = document.querySelector('#board');
        this.x = x;
        this.y = y;
    }

    createBoard() {
        for (let y = 0; y < this.y; y++) {
            const row = document.createElement('div');
            row.classList.add('row');
            for (let x = 0; x < this.x; x++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.addEventListener('click', () => {
                    console.log(x, y);
                });
                row.appendChild(cell);
            }
            this.container.appendChild(row);
        }
    }
}

(() => {
    const board = new Board(20, 10);
    const controls = new Controls();
    controls.createControls();
    board.createBoard();
})();
