// let board;

// let board = [
//     [
//       2, 0, 0, 9, 0,
//       0, 0, 0, 0
//     ],
//     [
//       0, 6, 0, 0, 5,
//       0, 0, 0, 0
//     ],
//     [
//       0, 7, 4, 0, 0,
//       1, 0, 0, 5
//     ],
//     [
//       0, 0, 0, 0, 0,
//       4, 8, 0, 0
//     ],
//     [
//       4, 0, 0, 6, 0,
//       0, 2, 1, 0
//     ],
//     [
//       0, 3, 0, 0, 0,
//       0, 0, 0, 0
//     ],
//     [
//       0, 5, 0, 0, 1,
//       0, 9, 0, 0
//     ],
//     [
//       3, 0, 6, 2, 0,
//       0, 0, 0, 0
//     ],
//     [
//       0, 2, 0, 0, 0,
//       0, 3, 6, 0
//     ]
//   ];

// let board = [
//         [0,0,3,0,2,0,6,0,0],
//         [9,0,0,3,0,5,0,0,1],
//         [0,0,1,8,0,6,4,0,0],
//         [0,0,8,1,0,2,9,0,0],
//         [7,0,0,0,0,0,0,0,8],
//         [0,0,6,7,0,8,2,0,0],
//         [0,0,2,6,0,9,5,0,0],
//         [8,0,0,2,0,3,0,0,9],
//         [0,0,5,0,1,0,3,0,0]];


// let board = [
//             [3,0,0,2,0,0,0,0,0],
//             [0,0,0,1,0,7,0,0,0],
//             [7,0,6,0,3,0,5,0,0],
//             [0,7,0,0,0,9,0,8,0],
//             [9,0,0,0,2,0,0,0,4],
//             [0,1,0,8,0,0,0,5,0],
//             [0,0,9,0,4,0,3,0,1],
//             [0,0,0,7,0,2,0,0,0],
//             [0,0,0,0,0,8,0,0,6]];

// let board = [
//     [0,0,8,7,0,3,0,2,0],
//     [0,0,1,9,8,6,0,0,0],
//     [0,0,6,0,0,0,0,0,8],
//     [7,0,0,0,0,0,4,0,2],
//     [0,6,0,0,4,0,0,0,1],
//     [0,1,2,0,0,5,0,0,0],
//     [9,0,4,0,3,1,0,0,6],
//     [6,0,0,2,0,7,0,4,0],
//     [1,0,0,0,6,9,0,0,5]
// ];

let board = [
    [3,0,7,0,0,1,0,0,0],
    [2,0,0,9,0,0,0,1,5],
    [0,0,0,0,0,2,0,9,3],
    [5,4,8,2,0,0,0,7,0],
    [0,0,0,0,0,6,0,0,0],
    [7,0,2,0,9,0,0,0,0],
    [0,0,0,6,5,0,0,0,0],
    [0,0,6,3,0,0,8,4,2],
    [8,0,0,1,0,0,5,0,0]
];


// let board = [
//     [1,0,0,0,0,5,0,0,8],
//     [0,4,0,0,9,0,0,0,0],
//     [0,0,0,1,0,0,4,6,3],
//     [2,0,8,0,1,0,0,0,6],
//     [7,0,0,0,0,4,3,5,0],
//     [0,0,0,0,3,0,0,0,0],
//     [0,0,1,0,0,0,0,0,4],
//     [0,8,0,0,0,0,6,0,0],
//     [4,0,0,0,0,6,1,9,2]
// ];

const initBoard = () => {

    board = [[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0]];
}

const showBoard = () => document.querySelector("body").style.opacity = 1;

const touchScreen = () => matchMedia('(hover: none)').matches;

const squareCoords = (touchedSquare) => {

    for (let [i, square] of squares.entries()) {
        if (square == touchedSquare) return [Math.floor(i / 8), i % 8];
    }
}

const setBoardSize = () => {

    let boardSize;

    if (screen.height > screen.width) {
        boardSize = Math.ceil(screen.width * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--board-size')) / 9) * 9;
    } else {
        boardSize = Math.ceil(window.innerHeight * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--board-size')) / 9) * 9;
    }

    document.documentElement.style.setProperty('--board-size', boardSize + 'px');
}

const disableTapZoom = () => {
    const preventDefault = (e) => e.preventDefault();
    document.body.addEventListener('touchstart', preventDefault, {passive: false});
}

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }

    return array;
}

const solved = (board) => {

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] == 0) return false;
        }
    }
    return true;
}

const count = (board) => {

    let n = 0;

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] != 0) n++;
        }
    }

    return n;
}


const valid = (board, row, col, val) => {

    let boxRow = Math.floor(row / 3) * 3;
    let boxCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 9; i++) {

        if (board[row][i] == val || board[i][col] == val) return false;

        let currentRow = boxRow + Math.floor(i / 3);
        let currrentCol = boxCol + Math.floor(i % 3);

        if (board[currentRow][currrentCol] == val) return false;
    }

    return true;
}

const rows = (board) => {

    for (let row = 0; row < 9; row++) {
        outer: for (let val = 1; val <= 9; val++) {

            let r, c;

            for (let col = 0; col < 9; col++) {

                if (board[row][col] != 0) continue;

                if (valid(board, row, col, val)) {

                    if (r != undefined) continue outer;

                    [r, c] = [row, col];
                }
            }

            if (r != undefined) return [r, c, val, 1];
        }
    }

    return [null, null, null, null];

}

const cols = (board) => {

    for (let col = 0; col < 9; col++) {
        outer: for (let val = 1; val <= 9; val++) {

            let r, c;

            for (let row = 0; row < 9; row++) {

                if (board[row][col] != 0) continue;

                if (valid(board, row, col, val)) {
   
                    if (r != undefined) continue outer;

                    [r, c] = [row, col];
                }
            }

            if (r != undefined) return [r, c, val, 2];
        }
    }

    return [null, null, null, null];
}

const squares = (board) => {

    for (let sq = 0; sq < 9; sq++) {
        outer: for (let val = 1; val <= 9; val++) {

            let r, c; 
            let boxRow = Math.floor(sq / 3) * 3;
            let boxCol = Math.floor(sq % 3) * 3;

            for (let cell = 0; cell < 9; cell++) {

                let row = boxRow + Math.floor(cell / 3);
                let col = boxCol + Math.floor(cell % 3);

                if (board[row][col] != 0) continue;

                if (valid(board, row, col, val)) {
                    
                    if (r != undefined) continue outer;

                    [r, c] = [row, col];
                }
            }

            if (r != undefined) return [r, c, val, 3];
        }
    }

    return [null, null, null, null];
}

const cells = (board) => {

    for (let row = 0; row < 9; row++) {
        outer: for (let col = 0; col < 9; col++) {

            if (board[row][col] != 0) continue;

            let v;

            for (let val = 1; val <= 9; val++) {

                if (valid(board, row, col, val)) {

                    if (v != undefined) continue outer;

                    v = val;
                }
            }

            if (v != undefined) return [row, col, v, 4];
        }
    }   

    return [null, null, null, null];
}

const solve = (board) => {

    let row, col, val, num;

    [row, col, val, num] = squares(board);
    if (row != undefined) return [row, col, val, num];

    // [row, col, val, num] = rows(board);
    // if (row != undefined) return [row, col, val, num];

    // [row, col, val, num] = cols(board);
    // if (row != undefined) return [row, col, val, num];

    // [row, col, val, num] = cells(board);
    // if (row != undefined) return [row, col, val, num];

    return [null, null, null, null];
}

const fill = () => {

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {

            if (board[row][col] != 0) continue;

            let arr = shuffle([1,2,3,4,5,6,7,8,9]);

            // console.log(arr);

            for (let i = 1; i <= 9; i++) {
            
                // if (valid(board, row, col, i)) {
                if (valid(board, row, col, arr[i - 1])) {


                    // board[row][col] = i;
                    board[row][col] = arr[i - 1];


                    if (fill()) return true;

                    // if (solve(board)) {
                    //     // console.log(board.map(arr => arr.slice()));
                    //     n++;
                    // }
                }
            }
            
            board[row][col] = 0;
            
            return false;
        }
    }

    return true;
}

const remove = () => {

    let cells = Array.from({length: 81}, (_, i) => i);

    // console.log(cells);

    cells = shuffle(cells);

    for (let i = 0; i < 81; i++) {

        let cell = cells[i];
        let row = Math.floor(cell / 9);
        let col = cell % 9;
        let val = board[row][col];

        if (count(board) == 38) break;
        
        board[row][col] = 0;

        if (solvable()) continue;

        board[row][col] = val;
    }
}

const solvable = (steps = false) => {

    let tempBoard = board.map(arr => arr.slice());

    do {

        let [row, col, val, num] = solve(tempBoard);

        if (steps) console.log(row, col, val, num);

        if (row == null) return false;

        tempBoard[row][col] = val;

    } while(!solved(tempBoard));

    if (steps) console.table(tempBoard);

    return true;
}

// document.querySelector('.time').innerHTML = t2 - t1;

const fillBoard = () => {

    let flatBoard = board.flat();

    console.log(flatBoard);

    document.querySelectorAll('.cell').forEach(cell => {

        let val = flatBoard.shift();

        if (val) cell.innerText = val;

    });


}

const init = () => {

    disableTapZoom();
    setBoardSize();
    initBoard();
    showBoard();
    
    let t0 = performance.now();

    fill();

    let t1 = performance.now();

    remove();

    let t2 = performance.now();

    fillBoard();

    solvable(true);


    console.table(board);

    console.log(t1 - t0);
    console.log(t2 - t1);
    console.log(count(board));
}

window.onload = () => document.fonts.ready.then(() => init());


