let board;
let nClues = 28;
let interval;

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
// [3,0,0,2,0,0,0,0,0],
// [0,0,0,1,0,7,0,0,0],
// [7,0,6,0,3,0,5,0,0],
// [0,7,0,0,0,9,0,8,0],
// [9,0,0,0,2,0,0,0,4],
// [0,1,0,8,0,0,0,5,0],
// [0,0,9,0,4,0,3,0,1],
// [0,0,0,7,0,2,0,0,0],
// [0,0,0,0,0,8,0,0,6]];

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

// let board = [
//     [3,0,7,0,0,1,0,0,0],
//     [2,0,0,9,0,0,0,1,5],
//     [0,0,0,0,0,2,0,9,3],
//     [5,4,8,2,0,0,0,7,0],
//     [0,0,0,0,0,6,0,0,0],
//     [7,0,2,0,9,0,0,0,0],
//     [0,0,0,6,5,0,0,0,0],
//     [0,0,6,3,0,0,8,4,2],
//     [8,0,0,1,0,0,5,0,0]
// ];


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

const showBoard = () => document.body.style.opacity = 1;

const touchScreen = () => matchMedia('(hover: none)').matches;

const saveBoard = () => {

    if (localStorage.getItem('solved') == null) {
        let solved = solve();
        localStorage.setItem('solved', JSON.stringify(solved))
    }
    
    localStorage.setItem('board', JSON.stringify(board))
};

// const loadBoard = () => board = JSON.parse(localStorage.getItem('board'));

const checkStorage = () => {

    if (localStorage.getItem('board') != null) {

        let solved = JSON.parse(localStorage.getItem('solved'));

        board = JSON.parse(localStorage.getItem('board'));

        save(solved);
    }

};

const clearStorage = () => {
    localStorage.clear();
}

const cellCoords = (touchedCell) => {

    let cells = document.querySelectorAll('.cell');

    for (let [i, cell] of cells.entries()) {
        if (cell == touchedCell) return [Math.floor(i / 9), i % 9];
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

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.trunc(Math.random() * (i + 1));
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
        let currrentCol = boxCol + i % 3;

        if (board[currentRow][currrentCol] == val) return false;
    }

    return true;
}

const rows = (board) => {

    for (let row = 0; row < 9; row++) {
        outer: for (let val = 1; val <= 9; val++) {

            let r, c;

            for (let col = 0; col < 9; col++) {

                if (board[row][col] != 0 || !valid(board, row, col, val)) continue;

                if (r != undefined) continue outer;

                [r, c] = [row, col];
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

                if (board[row][col] != 0 || !valid(board, row, col, val)) continue;

                if (r != undefined) continue outer;

                [r, c] = [row, col];
            }

            if (r != undefined) return [r, c, val, 2];
        }
    }

    return [null, null, null, null];
}

const boxes = (board) => {

    for (let sq = 0; sq < 9; sq++) {
        outer: for (let val = 1; val <= 9; val++) {

            let r, c; 
            let boxRow = Math.floor(sq / 3) * 3;
            let boxCol = Math.floor(sq % 3) * 3;

            for (let cell = 0; cell < 9; cell++) {

                let row = boxRow + Math.floor(cell / 3);
                let col = boxCol + cell % 3;

                if (board[row][col] != 0 || !valid(board, row, col, val)) continue;

                if (r != undefined) continue outer;

                [r, c] = [row, col];
            }

            if (r != undefined) return [r, c, val, 3];
        }
    }

    return [null, null, null, null];
}

// const cells = (board) => {

//     for (let row = 0; row < 9; row++) {
//         outer: for (let col = 0; col < 9; col++) {

//             if (board[row][col] != 0) continue;

//             let v;

//             for (let val = 1; val <= 9; val++) {

//                 if (valid(board, row, col, val)) {

//                     if (v != undefined) continue outer;

//                     v = val;
//                 }
//             }

//             if (v != undefined) return [row, col, v, 4];
//         }
//     }   

//     return [null, null, null, null];
// }

const find = (board, final = false) => {

    let row, col, val, num;

    // let nines = [squares, rows, cols];

    // final ? Math.random() < 0.5 ? [squares, rows, cols] : [squares, cols, rows] : shuffle(nines);

    // for (let i = 0; i < 3; i++) {
    //     [row, col, val, num] = nines[i](board);
    //     if (row != undefined) return [row, col, val, num];
    // }

    [row, col, val, num] = boxes(board);
    if (row != undefined) return [row, col, val, num];

    [row, col, val, num] = rows(board);
    if (row != undefined) return [row, col, val, num];

    [row, col, val, num] = cols(board);
    if (row != undefined) return [row, col, val, num];

    // [row, col, val, num] = cells(board);
    // if (row != undefined) return [row, col, val, num];

    return [null, null, null, null];
}

const fill = () => {

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {

            if (board[row][col] != 0) continue;

            // let arr = shuffle([1,2,3,4,5,6,7,8,9]);

            // console.log(arr);

            for (let i of shuffle([1,2,3,4,5,6,7,8,9])) {
            
                // if (valid(board, row, col, i)) {
                if (!valid(board, row, col, i)) continue;

                // board[row][col] = i;
                board[row][col] = i;

                if (fill()) return true;

                board[row][col] = 0;

                // if (solve(board)) {
                //     // console.log(board.map(arr => arr.slice()));
                //     n++;
                // }
            }
                        
            return false;
        }
    }

    return true;
}

const save = (board) => {

    let cells = document.querySelectorAll('.cell');

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {

            cells[row * 9 + col].dataset.val = board[row][col];
            // cells[row * 9 + col].innerText = board[row][col];

        }
    }
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

        if (count(board) == nClues) break;
        
        board[row][col] = 0;

        if (solvable()) continue;

        board[row][col] = val;
    }
}

const solvable = (steps = false, final = false) => {

    let tempBoard = board.map(arr => arr.slice());

    do {

        let [row, col, val, num] = find(tempBoard, final);

        if (steps) console.log(row, col, val, num);

        if (row == null) return false;

        tempBoard[row][col] = val;

    } while(!solved(tempBoard));

    // if (steps) console.table(tempBoard);

    return true;
}

const solve = (final = false) => {

    let tempBoard = board.map(arr => arr.slice());

    do {

        let [row, col, val, num] = find(tempBoard, final);

        if (row == null) return false;

        tempBoard[row][col] = val;

    } while(!solved(tempBoard));

    return tempBoard;
}

const fillBoard = () => {

    let flatBoard = board.flat();

    console.log(flatBoard);

    document.querySelectorAll('.cell').forEach(cell => {

        let val = flatBoard.shift();

        // cell.dataset.val = val;

        if (val) {
            cell.firstChild.innerText = val;
            cell.classList.add('filled');
        } else {
            cell.firstChild.innerText = '';
            // cell.classList.add('green');
        }

    });
}

// const checkRow = (row, col, val) => {

//     console.log(' ');

//     for (let i = 0; i < 9; i++) {

//         if (i == col || board[row][i] != 0) continue;

//         console.log('row: ', row, i, valid(board, row, i, val));

//         if (valid(board, row, i, val)) return false;
//     }

//     console.log('ROW');

//     return true;
// }

// const checkCol = (row, col, val) => {

//     console.log(' ');

//     for (let i = 0; i < 9; i++) {

//         if (i == row || board[i][col] != 0) continue;

//         console.log('col: ', i, col, valid(board, i, col, val));

//         if (valid(board, i, col, val)) return false;
//     }
//     console.log('COL');


//     return true;
// }

// const checkSquare = (row, col, val) => {

//     let boxRow = Math.floor(row / 3) * 3;
//     let boxCol = Math.floor(col / 3) * 3;

//     console.log(' ');



//     for (let i = 0; i < 9; i++) {


//         let r = boxRow + Math.floor(i / 3);
//         let c = boxCol + Math.floor(i % 3);

//         if (r == row && c == col || board[r][c] != 0) continue;

//         console.log('sq: ', r, c, valid(board, r, c, val));

//         if (valid(board, r, c, val)) return false;
//     }

//     console.log('SQ');


//     return true;
// }

// const checkCell = (row, col, val) => {

//     console.log(' ');


//     for (i = 1; i <= 9; i++) {

//         if (i == val) continue;

//         if (valid(board, row, col, val)) return false;
//     }

//     console.log('CELL');

//     return true;
// }

// const logic = (row, col, val) => {

//     if (checkRow(row, col, val) || checkCol(row, col, val) || checkSquare(row, col, val) || checkCell(row, col, val)) return true;

//     // if (checkRow(row, col, val)) return true;


//     return false;
// }

const select = (e) => {

    let cell = e.currentTarget;
    let cells = document.querySelectorAll('.cell');

    // console.table(board);

    clearHint();
    // enableBar();

    console.log(e.currentTarget);

    // if (cell.classList.contains('correct') || cell.classList.contains('wrong')) {
        // cell.style.animationDuration = '0.1s'
    // }

    let [row, col] = cellCoords(cell);

    let val = parseInt(cell.dataset.val);

    console.log(row, col, val);

    // logic(row, col, val) ? cell.classList.add('green') : cell.classList.add('red');

    if (cell.classList.contains('filled')) { 
        for (let cell of cells) {
            cell.classList.remove('select');
        }

        document.querySelector('.numbers').classList.remove('display');
        document.querySelector('.bar').classList.remove('display');

        // disableDigits();
        // disableEraser();
        return;
    }

    if (cell.classList.contains('select')) {
        cell.classList.remove('select');
        document.querySelector('.numbers').classList.remove('display');
        document.querySelector('.bar').classList.remove('display');
        // disableDigits();
        // disableEraser();

        return;
    } 

    for (let cell of cells) {
        cell.classList.remove('select');
    }

    cell.classList.add('select');

    document.querySelector('.numbers').classList.remove('display');
    document.querySelector('.bar').classList.remove('display');

    // if (cell.classList.contains('red')) {

    //     document.querySelector('.numbers').style.display = 'none';
    //     document.querySelector('.hint').style.display = 'flex';

    //     setTimeout(() => {
    //         document.querySelector('.hint').classList.add('display');   
    //         // enableEraser();              
    //     }, 0);

    //     return;  
    // }

    document.querySelector('.bar').style.display = 'none';
    document.querySelector('.numbers').style.display = 'flex';

    setTimeout(() => {
        document.querySelector('.numbers').classList.add('display');   
        // enableDigits();             
    }, 0);
}

const showBar = (init = false) => {

    console.log("SHOWBAR");

    let numbers = document.querySelector('.numbers');
    // let button = document.querySelector('.hint');
    let bar = document.querySelector('.bar');
    
    if (numbers.classList.contains('display') || bar.classList.contains('showbar')) return;

    // console.log(getComputedStyle(bar).getPropertyValue(display));
    
    numbers.style.display = 'none';
    // button.style.display = 'grid';
    bar.style.display = 'flex';

    bar.style.visibility = 'visible';
    init ? bar.classList.add('showbarinit') : bar.classList.add('showbar');


    bar.addEventListener('animationend', e => {

        let bar = e.currentTarget;

        numbers.style.display = 'grid';
        bar.style.display = 'none';

        // button.style.display = 'none';
        // numbers.style.display = 'flex';

        // button.style.visibility = 'hidden';
        bar.classList.remove('showbar', 'showbarinit');
        bar.style.animationDuration = '';

    }, {once: true});
}

const clearHint = () => {

    console.log("CLEARHINT");

    clearInterval(interval);

    let cells = document.querySelectorAll('.cell');
    // let event = new Event('transitionend');

    let bar = document.querySelector('.bar');

    bar.classList.remove('showbar', 'showbarinit');

    for (let cell of cells) {
        if (cell.classList.contains('correct') || cell.classList.contains('wrong')) {
            // cell.classList.remove('correct');
            cell.firstChild.innerText = '';
            // cell.style.animation = '';
            cell.style.animationDuration = '0.0s';
            // cell.dispatchEvent(event);
        }

        if (cell.classList.contains('wrong')) cell.classList.add('stopbar');

        // cell.style.transition = `background-color 0s ease-in-out, font-weight 0s ease-in-out`;
        // cell.style = '';

        cell.style.transition = '';

        // cell.removeAttribute('style');
        cell.classList.remove('gray', 'bold', 'wrong','correct', 'pop');
    }
}

const showHint = (e) => {

    console.log("SHOWHINT");

    if (solved(board)) {
        console.log(interval);
        if (!interval) firework();
        e.stopPropagation();
        let bar = document.querySelector('.bar');
        bar.style.animationDuration = '0.0s';

        return;
    }

    clearHint();

    let cells = document.querySelectorAll('.cell');
    let [row, col, val, num, clues] = hints(board);
    let cell = cells[row * 9 + col];
    let delay = 0;

    document.querySelector('.bar').style.animationDuration = '0s';

    let boxRow = Math.trunc(row / 3) * 3;
    let boxCol = Math.trunc(col / 3) * 3;

    // disableTouch();
    // disableBar();

    for (let clue of clues.sort((a, b) => a - b)) {

        let boxRow2 = Math.trunc(Math.trunc(clue / 9) / 3) * 3;
        let boxCol2 = Math.trunc(clue % 9 / 3) * 3;
        let type;

        cells[clue].style.transition = `font-weight 0.5s ${delay}s ease-in-out`;
        cells[clue].classList.add('bold');

        delay += 0.5;

        switch(num) {
            case 1:
                type = boxRow == boxRow2 ? 3 : 2;
                break;
            case 2:
                type = boxCol== boxCol2 ? 3 : 1;
                break;
            case 3:
                type = boxRow == boxRow2 ? 1 : 2;
                break;
        }

        let i = 1; 

        switch(type) {

            case 1:
                console.log("ROW");

                // i = 1;

                while (clue % 9 + i < 9 || clue % 9 - i >= 0) {
                // for (let i = 1; i < 9; i++) {
                    // if (i != clue % 9) cells[Math.trunc(clue / 9) * 9  + i].style.transition = `background-color 0.5s ${delay}s ease-in-out`;   
                    // if (board[Math.trunc(clue / 9)][i] == 0) cells[Math.trunc(clue / 9) * 9  + i].classList.add('gray');
                    // if (i != clue % 9) cells[Math.trunc(clue / 9) * 9  + i].classList.add('gray');
                    // cells[Math.trunc(clue / 9) * 9  + i].classList.add('gray');

                    if (clue % 9 + i < 9 && !cells[Math.trunc(clue / 9) * 9  + clue % 9 + i].classList.contains('gray')) {
                        cells[Math.trunc(clue / 9) * 9  + clue % 9 + i].classList.add('gray');
                        cells[Math.trunc(clue / 9) * 9  + clue % 9 + i].style.transition = `background-color 0.5s ${delay}s ease-in-out`;  
                    }
                    
                    if (clue % 9 - i >= 0 && !cells[Math.trunc(clue / 9) * 9  + clue % 9 - i].classList.contains('gray')) {
                        cells[Math.trunc(clue / 9) * 9  + clue % 9 - i].classList.add('gray');
                        cells[Math.trunc(clue / 9) * 9  + clue % 9 - i].style.transition = `background-color 0.5s ${delay}s ease-in-out`;  
                    }

                    delay += 0.1;
                    i++;
                }

                // for (let i = 0; i < 9; i++) {
                //     if (i != clue % 9 && !cells[Math.trunc(clue / 9) * 9  + i].classList.contains('gray')) {
                //         cells[Math.trunc(clue / 9) * 9  + i].style.transition = `background-color 0.5s ${delay}s ease-in-out`;   
                //         cells[Math.trunc(clue / 9) * 9  + i].classList.add('gray');
                //     }
                // }

                delay += 0.5;

                break;

            case 2:
                console.log("COL");

                // i = 1;

                while (Math.trunc(clue / 9) + i < 9 || Math.trunc(clue / 9) - i >= 0) {
                // for (let i = 1; i < 9; i++) {
                    // if (i != Math.trunc(clue / 9)) cells[i * 9 + clue % 9].style.transition = `background-color 0.5s ${delay}s ease-in-out`;
                    // if (board[i][clue % 9] == 0) cells[i * 9 + clue % 9].classList.add('gray');
                    // if (i != Math.trunc(clue / 9)) cells[i * 9 + clue % 9].classList.add('gray');
                    // cells[i * 9 + clue % 9].classList.add('gray');

                    if (Math.trunc(clue / 9) + i < 9 && !cells[(Math.trunc(clue / 9) + i) * 9  + clue % 9].classList.contains('gray')) {
                        cells[(Math.trunc(clue / 9) + i) * 9  + clue % 9].classList.add('gray');
                        cells[(Math.trunc(clue / 9) + i) * 9  + clue % 9].style.transition = `background-color 0.5s ${delay}s ease-in-out`;  
                    }
                    
                    if (Math.trunc(clue / 9) - i >= 0 && !cells[(Math.trunc(clue / 9) - i) * 9  + clue % 9].classList.contains('gray')) {
                        cells[(Math.trunc(clue / 9) - i) * 9  + clue % 9].classList.add('gray');
                        cells[(Math.trunc(clue / 9) - i) * 9  + clue % 9].style.transition = `background-color 0.5s ${delay}s ease-in-out`;  
                    }

                    delay += 0.1;
                    i++;
                }

                // for (let i = 0; i < 9; i++) {
                //     if (i != Math.trunc(clue / 9) && !cells[i * 9 + clue % 9].classList.contains('gray')) {
                //         cells[i * 9 + clue % 9].style.transition = `background-color 0.5s ${delay}s ease-in-out`;   
                //         cells[i * 9 + clue % 9].classList.add('gray');
                //     }
                // }

                delay += 0.5;

                break;

            case 3:

                console.log("BOX");

                let offsets = [0,1,2,9,10,11,18,19,20]; 

                // let sequences = [[3,1,6,4,2,7,5,8],
                //                  [0,2,3,4,5,6,7,8],
                //                  [1,5,0,4,8,3,7,6],
                //                  [0,6,1,4,7,2,5,8],
                //                  [0,1,2,3,5,6,7,8],
                //                  [2,8,1,4,7,0,3,6],
                //                  [3,7,0,4,8,1,5,2],
                //                  [6,8,3,4,5,0,1,2],
                //                  [7,5,6,4,2,3,1,0]];

                let sequences = [[[3,1],[6,4,2],[7,5],[8]],
                                 [[0,2],[3,4,5],[6,7,8]],
                                 [[1,5],[0,4,8],[3,7],[6]],
                                 [[0,6],[1,4,7],[2,5,8]],
                                 [[0,1,2,3,5,6,7,8]],
                                 [[2,8],[1,4,7],[0,3,6]],
                                 [[3,7],[0,4,8],[1,5],[2]],
                                 [[6,8],[3,4,5],[0,1,2]],
                                 [[7,5],[6,4,2],[3,1],[0]]];

                let offset = offsets.indexOf(clue - (boxRow2 * 9 + boxCol2));
                let sequence = sequences[offset];

                console.log(boxRow2, boxCol2, clue, clue - (boxRow2 * 9 + boxCol2), offsets.indexOf(clue - (boxRow2 * 9 + boxCol2))); 

                // for (let i of sequence) {

                for (let batch of sequence) {
                    for (let i of batch) {
                
                        let currentRow = boxRow2 + Math.trunc(i / 3);
                        let currrentCol = boxCol2 + i % 3;

                        if (currentRow != Math.trunc(clue / 9) || currrentCol != clue % 9) cells[currentRow * 9 + currrentCol].style.transition = `background-color 0.5s ${delay}s ease-in-out`;
                        if (currentRow != Math.trunc(clue / 9) || currrentCol != clue % 9) cells[currentRow * 9 + currrentCol].classList.add('gray');
                    }
                    delay += 0.1;
                }
                // }

                delay += 0.5;

                break;
        }
    }

    // delay += 0.5;

    cell.firstChild.innerText = val;

    cell.style.animation = 'hint 1s 5 ease forwards';
    cell.style.animationDelay = `${delay}s`;


    cell.classList.add('correct');

    // clues.forEach(clue => cells[clue].classList.add('bold'));

    // shadeSquares(row, col, val, num, clues);
            
    cell.addEventListener('animationend', e => {

        let cell = e.currentTarget;

        cell.classList.remove('correct');
        cell.firstChild.innerText = '';
        cell.style.animation = '';
        cell.style.animationDuration = '';


        document.querySelectorAll('.gray, .bold').forEach(el => {
            el.style.transition = `background-color 0.2s ease-in-out, font-weight 0.2s ease-in-out`;
            el.classList.remove('gray', 'bold');
        });

        // cells.forEach(cell => {
        //     cell.style.transition = `background-color 0.2s ease-in-out, font-weight 0.2s ease-in-out`;
        //     cell.classList.remove('gray')
        // });

        // clues.forEach(clue => cells[clue].classList.remove('bold'));

        // enableTouch();

        console.log("SHOWHINT");

        // enableBar();

    }, {once: true});



    // console.log(solve(board));
    // hints(board);
}


const selectDigit = (e) => {

    let digit = parseInt(e.currentTarget.innerText);
    let cells = document.querySelectorAll('.cell');

    // disableBar();

    for (let cell of cells) {
        if (cell.classList.contains('select')) {

            let [row, col] = cellCoords(cell);

            cell.classList.remove('select');

            cell.firstChild.innerText = digit;

            if (cell.dataset.val == digit) {
                cell.classList.add('filled');
                board[row][col] = digit;

                console.log(cell);
                saveBoard();
                // if (!solved(board)) setTimeout(enableBar, 100);
            } else {
                cell.classList.add('wrong');

                cell.style.animation = `error 0.75s 3 ease forwards`;


                cell.addEventListener('animationend', e => {

                    console.log("WRONGEND");

                    let cell = e.currentTarget;

                    cell.classList.remove('wrong');
                    cell.firstChild.innerText = '';
                    cell.style.animation = '';
                    cell.style.animationDuration = '';

                    if (!cell.classList.contains('stopbar')) showBar();
                    cell.classList.remove('stopbar');
                    // enableBar();

                }, {once: true});

            }
        }

        document.querySelector('.numbers').classList.remove('display');
        // disableDigits();

    }

    if (solved(board)) {
        clearStorage();
        setTimeout(firework, 500)
    };

    e.stopPropagation();

    console.log(digit);
}

const reset = (e) => {

    clearHint();
    localStorage.clear();

    // e.stopPropagation();

    // console.log(document.querySelector('.bar').classList.contains('showbar'));
    document.querySelector('.bar').style.animationDuration = '0s';
    document.querySelector('.board').removeEventListener('touchstart', reset);
    document.querySelector('.board').removeEventListener('mousedown', reset);

    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('filled');
        cell.firstChild.classList.remove('pop');
    });

    setTimeout(() => {

        console.log("RELOAD");

        initBoard();    
        fill();
        save(board); 
        remove();
        saveBoard();
        fillBoard();
        document.querySelector('.bar').style = '';
    }, 50);

    
    // enableBar();
}

const firework = () => {
    disableTouch();

    console.log('FIREWORK');

    let n = 0;

    let cells = document.querySelectorAll('.cell');

    for (let cell of cells) {
        cell.removeAttribute('style');
    }

    let order = Array.from({length: 81}, (_, i) => i);
    order = shuffle(order);
    // console.log(cells);

    const pop = () => {
        if (n > 80){
            document.querySelector('.board').addEventListener('touchstart', reset);
            document.querySelector('.board').addEventListener('mousedown', reset);
            clearInterval(interval);
            interval = null;
            // enableBar();
            setTimeout(showBar, 1000);
            enableTouch();

        } else {
            cells[order[n]].firstChild.classList.add('pop');
            cells[order[n]].firstChild.addEventListener('animationend', e => {
                let cell = e.currentTarget;
                cell.classList.remove('pop');
            });

            n++;
        }
    }

    interval = setInterval(pop, 100);
}

const eraser = (e) => {

    let cells = document.querySelectorAll('.cell');

    for (let cell of cells) {
        if (cell.classList.contains('gray')) {

            let [row, col] = cellCoords(cell);

            cell.classList.remove('gray','red');
            cell.firstChild.innerText = '';
            board[row][col] = 0;
        }

        document.querySelector('.eraser').classList.remove('display');

        // disableDigits();
        // disableEraser();
    }
}

const enableDigits = () => {

    let digits = document.querySelectorAll('.number');

    for (let digit of digits){
        if (touchScreen()){
            digit.addEventListener("touchstart", selectDigit);
        } else {
            digit.addEventListener("mousedown", selectDigit);
        }
    }
}

// const disableDigits = () => {

//     let digits = document.querySelectorAll('.number');

//     for (let digit of digits){
//         if (touchScreen()){
//             digit.removeEventListener("touchstart", selectDigit);
//         } else {
//             digit.removeEventListener("mousedown", selectDigit);
//         }
//     }
// }

const reloadBtn = () => {

    console.log("RELOAD");
}

const enableBar = () => {

    let reload = document.querySelector('.reload');
    let hint = document.querySelector('.hint');

    if (touchScreen()){
        document.body.addEventListener('touchstart', hintArea);
        hint.addEventListener("touchstart", showHint);
        reload.addEventListener("touchstart", reset);
    } else {
        document.body.addEventListener('mousedown', hintArea);
        hint.addEventListener("mousedown", showHint);
        reload.addEventListener("mousedown", reset);
    }

    console.log("ENABLE BAR");
}

const disableBar = () => {

    let reload = document.querySelector('.reload');
    let hint = document.querySelector('.hint');

    if (touchScreen()){
        document.body.removeEventListener('touchstart', hintArea);
        hint.removeEventListener("touchstart", showHint);
        reload.removeEventListener("touchstart", reset);
    } else {
        document.body.removeEventListener('mousedown', hintArea);
        hint.removeEventListener("mousedown", showHint);
        reload.removeEventListener("mousedown", reset);
    }
}

// const enableEraser = () => {

//     let x = document.querySelector('.x');

//         if (touchScreen()){
//             x.addEventListener("touchstart", showHint);
//         } else {
//             x.addEventListener("mousedown", showHint);
//         }
// }

// const disableEraser = () => {

//     let x = document.querySelector('.x');

//         if (touchScreen()){
//             x.removeEventListener("touchstart", eraser);
//         } else {
//             x.removeEventListener("mousedown", eraser);
//         }
// }

const disableTapZoom = () => {

    const preventDefault = (e) => e.preventDefault();

    document.body.addEventListener('touchstart', preventDefault, {passive: false});
    document.body.addEventListener('mousedown', preventDefault, {passive: false});
}

// const 

const hintArea = (e) => {

    // console.log('----')

    let h1 = document.querySelector('h1');
    let board = document.querySelector('.board');
    let cell = document.querySelector('.cell');

    let top = board.offsetTop - cell.offsetHeight * 2;
    let bottom = board.offsetTop;
    let left = board.offsetLeft;
    let right = board.offsetLeft + board.offsetWidth;
    let x, y;

    if (touchScreen()) {
        // console.log(e.touches[0].clientX);
        // console.log(e.touches[0].clientY);

        x = e.touches[e.touches.length - 1].clientX;
        y = e.touches[e.touches.length - 1].clientY;

    } else {
        // console.log(e.clientX);
        // console.log(e.clientY);

        x = e.clientX;
        y = e.clientY;

    }

    // console.log(h1.offsetTop + h1.offsetHeight * 0.87);

    // console.log(board.offsetTop - cell.offsetHeight * 2);

    // console.log(board.offsetTop);

    if (x > left && x < right && y < bottom && y > top) showBar();
}

const enableTouch = () => {

    let cells = document.querySelectorAll('.cell');

    for (let cell of cells){
        if (touchScreen()){
            cell.addEventListener("touchstart", select);
        } else {
            cell.addEventListener("mousedown", select);
        }
    }
}

const disableTouch = () => {

    let cells = document.querySelectorAll('.cell');

    for (let cell of cells){
        if (touchScreen()){
            cell.removeEventListener("touchstart", select);
        } else {
            cell.removeEventListener("mousedown", select);
        }
    }
}

const initBar = () => {

    document.querySelector('body').addEventListener('transitionend', e => {
        
        console.log("HELLO");
    });

}

const aiPlay = () => {
    return true;
}

const init = () => {

    // window.addEventListener('visibilitychange', () => {
    //     if (document.hidden) win() ? reset() : clearHint();
    // }, false);

    disableTapZoom();
    setBoardSize();


    initBoard();
    
    let t0 = performance.now();

    fill();

    // saveBoard();

    save(board); 

    let t1 = performance.now();

    remove();

    let t2 = performance.now();

    // console.log(board.map(arr => arr.slice()));

    // console.log(checkStorage());

    checkStorage();

    saveBoard();


    // console.log(board.map(arr => arr.slice()));


    // save(); 

    // console.table(board);

    fillBoard();

    // setTimeout(() => {

        showBoard();

        initBar();

        setTimeout(showBar, 1000, true);


        enableTouch();
        enableDigits();
        // enableEraser();
        enableBar();

        solvable(true, true);


        console.table(board);

        console.log(t1 - t0);
        console.log(t2 - t1);
        console.log(count(board));
    // }, 500);
}

window.onload = () => document.fonts.ready.then(init());