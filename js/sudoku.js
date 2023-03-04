let board;
let nClues = 28;
let interval;
let hidden = [];
let timer;

let startTime; //
let times = []; //
// let x, y;

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

    // board = [[0,0,0,5,2,6,0,0,3],
    //          [0,0,0,7,0,0,1,0,0],
    //          [0,3,0,0,8,0,0,0,5],
    //          [7,0,0,0,4,0,9,0,6],
    //          [0,0,0,0,0,0,2,0,0],
    //          [0,5,9,8,0,7,0,0,0],
    //          [0,9,7,3,0,0,0,0,0],
    //          [3,0,0,0,0,0,0,0,7],
    //          [0,4,0,0,0,0,0,0,1]];

        // board = [[4, 5, 7, 1, 6, 8, 9, 2, 3],
        //          [6, 2, 8, 3, 7, 9, 5, 1, 4],
        //          [3, 9, 1, 5, 2, 4, 8, 6, 7],
        //          [1, 6, 9, 2, 5, 3, 4, 7, 8],
        //          [7, 3, 2, 8, 4, 6, 1, 5, 9],
        //          [8, 4, 5, 9, 1, 7, 2, 3, 6],
        //          [5, 8, 6, 4, 3, 1, 7, 9, 2],
        //          [2, 7, 4, 6, 9, 5, 3, 0, 1],
        //          [9, 1, 3, 7, 8, 2, 6, 4, 5]];


}

const showBoard = () => document.body.style.opacity = 1;

const touchScreen = () => matchMedia('(hover: none)').matches;

const clearStorage = () => localStorage.clear();

const minArray = (arrays) => arrays.reduce((prev, next) => prev.length > next.length ? next : prev);

const setBoardSize = () => {

    let boardSize;

    if (screen.height > screen.width) {
        boardSize = Math.ceil(screen.width * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--board-size')) / 9) * 9;
    } else {
        boardSize = Math.ceil(window.innerHeight * parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--board-size')) / 9) * 9;
    }

    document.documentElement.style.setProperty('--board-size', boardSize + 'px');
}

const saveBoard = () => {

    // if (localStorage.getItem('solved') == null) {
    //     let solved = solve();
    //     localStorage.setItem('solved', JSON.stringify(solved))
    // }
    
    let item = {

        board,
        // expiry: Date.now() + 604800000
        expiry: Date.now() + 60000

    }

    // localStorage.setItem('board', JSON.stringify(board));

    localStorage.setItem('board', JSON.stringify(item));

};

// const loadBoard = () => board = JSON.parse(localStorage.getItem('board'));

const checkStorage = () => {

    // if (localStorage.getItem('board') != null) {

    //     let solved = JSON.parse(localStorage.getItem('solved'));

    //     board = JSON.parse(localStorage.getItem('board'));

    //     saveFilled(solved);
    // }

     if (localStorage.getItem('board') != null) {

        let boardStr = JSON.parse(localStorage.getItem('board'));

        if (Date.now() > boardStr.expiry) return;

        board = boardStr.board;

        let solved = solve();

        saveFilled(solved);
    }
}

const cellCoords = (touchedCell) => {

    let cells = document.querySelectorAll('.cell');

    for (let [i, cell] of cells.entries()) {
        if (cell == touchedCell) return [Math.trunc(i / 9), i % 9];
    }
}

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.trunc(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }

    return array;
}

const permuteArrays = (arrays) => {

    if (arrays.length == 0) return [[]];
  
      let result = [];

      arrays[0].forEach(el =>  {

        let rest = permuteArrays(arrays.slice(1));

        rest.forEach(permutation => result.push([...new Set([el].concat(permutation))]));
      });

      return result.sort((a, b) => a - b);
  }

const solved = (board) => {

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] == 0) return false;
        }
    }
    return true;
}

const countFilled = () => {

    let n = 0;

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] != 0) n++;
        }
    }

    return n;
}

const validDigit = (board, row, col, val) => {

    let boxRow = Math.trunc(row / 3) * 3;
    let boxCol = Math.trunc(col / 3) * 3;

    for (let i = 0; i < 9; i++) {

        if (board[row][i] == val || board[i][col] == val) return false;

        let currentRow = boxRow + Math.trunc(i / 3);
        let currrentCol = boxCol + i % 3;

        if (board[currentRow][currrentCol] == val) return false;
    }

    return true;
}

const checkRows = (board, hint = false) => {

    for (let row = 0; row < 9; row++) {
        outer: for (let val = 1; val <= 9; val++) {

            let r, c;

            for (let col = 0; col < 9; col++) {

                if (board[row][col] != 0 || !validDigit(board, row, col, val)) continue;

                if (r != undefined) continue outer;

                [r, c] = [row, col];
            }

            // if (r != undefined) return [r, c, val, 'row'];
            if (r != undefined) {
                if (!hint) return [r, c, val, 'row'];
                hidden.push([r, c, val, 'row'])
            }
        }
    }

    return [null, null, null, null];
}


const checkCols = (board, hint = false) => {

    for (let col = 0; col < 9; col++) {
        outer: for (let val = 1; val <= 9; val++) {

            let r, c;

            for (let row = 0; row < 9; row++) {

                if (board[row][col] != 0 || !validDigit(board, row, col, val)) continue;

                if (r != undefined) continue outer;

                [r, c] = [row, col];
            }

            // if (r != undefined) return [r, c, val, 'col'];
            if (r != undefined) {
                if (!hint) return [r, c, val, 'col'];
                hidden.push([r, c, val, 'col'])
            }
        }
    }

    return [null, null, null, null];
}

const checkBoxes = (board, hint = false) => {

    for (let sq = 0; sq < 9; sq++) {
        outer: for (let val = 1; val <= 9; val++) {

            let r, c; 
            let boxRow = Math.trunc(sq / 3) * 3;
            let boxCol = sq % 3 * 3;

            for (let cell = 0; cell < 9; cell++) {

                let row = boxRow + Math.trunc(cell / 3);
                let col = boxCol + cell % 3;

                if (board[row][col] != 0 || !validDigit(board, row, col, val)) continue;

                if (r != undefined) continue outer;

                [r, c] = [row, col];
            }

            // if (r != undefined) return [r, c, val, 'box'];
            if (r != undefined) {
                if (!hint) return [r, c, val, 'box'];
                hidden.push([r, c, val, 'box'])
            }
        }
    }

    return [null, null, null, null];
}

const checkCells = (board, hint = false) => {

    for (let row = 0; row < 9; row++) {
        outer: for (let col = 0; col < 9; col++) {

            if (board[row][col] != 0) continue;

            let v;

            for (let val = 1; val <= 9; val++) {

                if (validDigit(board, row, col, val)) {

                    if (v != undefined) continue outer;

                    v = val;
                }
            }

            // if (v != undefined) return [row, col, v, 4];
            if (v != undefined) {
                if (!hint) return [row, col, v, 'cell'];
                hidden.push([row, col, v, 'cell'])
            }
        }
    }   

    return [null, null, null, null];
}

const findDigit = (board) => {

    let row, col, val, type;

    // let nines = [squares, rows, cols];

    // final ? Math.random() < 0.5 ? [squares, rows, cols] : [squares, cols, rows] : shuffle(nines);

    // for (let i = 0; i < 3; i++) {
    //     [row, col, val, num] = nines[i](board);
    //     if (row != undefined) return [row, col, val, num];
    // }

    [row, col, val, type] = checkBoxes(board);
    if (row != undefined) return [row, col, val, type];

    [row, col, val, type] = checkRows(board);
    if (row != undefined) return [row, col, val, type];

    [row, col, val, type] = checkCols(board);
    if (row != undefined) return [row, col, val, type];

    // [row, col, val, type] = checkCells(board);
    // if (row != undefined) return [row, col, val, type];

    return [null, null, null, null];
}

const fillGrid = () => {

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {

            if (board[row][col] != 0) continue;

            // let arr = shuffle([1,2,3,4,5,6,7,8,9]);

            // console.log(arr);

            for (let i of shuffle([1,2,3,4,5,6,7,8,9])) {
            
                // if (validDigit(board, row, col, i)) {
                if (!validDigit(board, row, col, i)) continue;

                // board[row][col] = i;
                board[row][col] = i;

                if (fillGrid()) return true;

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

const saveFilled = (board) => {

    let cells = document.querySelectorAll('.cell');

    console.log(board);

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {

            console.log(row, col,  board[row][col]);

            cells[row * 9 + col].dataset.val = board[row][col];
            // cells[row * 9 + col].innerText = board[row][col];

        }
    }
}

const removeDigits = () => {

    let cells = Array.from({length: 81}, (_, i) => i);

    // console.log(cells);

    cells = shuffle(cells);

    for (let i = 0; i < 81; i++) {

        let cell = cells[i];
        let row = Math.trunc(cell / 9);
        let col = cell % 9;
        let val = board[row][col];

        // if (countFilled() == Math.ceil(Math.E * 10)) break;
                
        // if (countFilled() == 80) break;

        
        board[row][col] = 0;

        if (solvable()) continue;

        board[row][col] = val;
    }

    console.log("CLUES: ", countFilled());
}

const solvable = (steps = false) => {

    let tempBoard = board.map(arr => arr.slice());

    do {

        let [row, col, val, type] = findDigit(tempBoard);

        if (steps) console.log(row, col, val, type);

        if (row == null) return false;

        tempBoard[row][col] = val;

    } while(!solved(tempBoard));

    // if (steps) console.table(tempBoard);

    return true;
}

const solve = () => {

    let tempBoard = board.map(arr => arr.slice());

    do {

        let [row, col, val, type] = findDigit(tempBoard);

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

const selectCell = (e) => {

    let cell = e.currentTarget;
    let cells = document.querySelectorAll('.cell');
    let bar = document.querySelector('.bar');
    let numbers = document.querySelector('.numbers');

    // console.table(board);

    clearHint();
    // enableBar();

    console.log(e.currentTarget);

    // if (cell.classList.contains('correct') || cell.classList.contains('incorrect')) {
        // cell.style.animationDuration = '0.1s'
    // }

    let [row, col] = cellCoords(cell);

    let val = Number(cell.dataset.val);

    console.log(row, col, val);

    // logic(row, col, val) ? cell.classList.add('green') : cell.classList.add('red');

    if (cell.classList.contains('filled')) { 

        console.log("FILLED");

        // if (bar.classList.contains('showbarinit') || bar.classList.contains('showbar')) return;

        for (let cell of cells) {
            cell.classList.remove('select');
        }

        numbers.classList.remove('display');
        // bar.classList.remove('showbarinit', 'showbar');
        // bar.style.display = 'none';
        // numbers.style.display = 'flex';
        // bar.style.animationDuration = '';

        // disableDigits();
        // disableEraser();
        return;
    }

    if (cell.classList.contains('select')) {
        cell.classList.remove('select');
        numbers.classList.remove('display');
        // bar.classList.remove('showbarinit', 'showbar');
        // disableDigits();
        // disableEraser();

        return;
    } 

    for (let cell of cells) {
        cell.classList.remove('select');
    }

    cell.classList.add('select');

    document.querySelector('.numbers').classList.remove('display');
    // document.querySelector('.bar').classList.remove('showbar', 'showbarinit');

    // if (cell.classList.contains('red')) {

    //     document.querySelector('.numbers').style.display = 'none';
    //     document.querySelector('.hint').style.display = 'flex';

    //     setTimeout(() => {
    //         document.querySelector('.hint').classList.add('display');   
    //         // enableEraser();              
    //     }, 0);

    //     return;  
    // }

    // bar.style.display = 'none';
    // numbers.style.display = 'flex';

    setTimeout(() => document.querySelector('.numbers').classList.add('display'), 0);
}

// const showBar = ({auto = false} = {}) => {

//     console.log("SHOWBAR", auto);

//     // let event = new Event('mousemove');
//     let numbers = document.querySelector('.numbers');
//     // let button = document.querySelector('.hint');
//     let bar = document.querySelector('.bar');

//     if (aiMode()) bar.style.animationDuration = '';
    
//     if (numbers.classList.contains('display') || bar.classList.contains('showbar') || bar.classList.contains('showbarinit')) return;

//     // if (numbers.classList.contains('display')) return;


//     console.log("SHOWBAR2");

//     // console.log(getComputedStyle(bar).getPropertyValue(display));
    
//     numbers.style.display = 'none';
//     // button.style.display = 'grid';
//     bar.style.display = 'flex';

//     bar.style.visibility = 'visible';

//     auto ? bar.classList.add('showbarinit') : bar.classList.add('showbar');

//     // if (bar.classList.contains ('showbar')) console.log("CONTAINS");

//     // document.dispatchEvent(event);

//     bar.addEventListener('animationend', e => {

//         let bar = e.currentTarget;
//         // let event = new Event('mousemove');

//         numbers.style.display = 'flex';
//         bar.style.display = 'none';

//         // button.style.display = 'none';
//         // numbers.style.display = 'flex';

//         // button.style.visibility = 'hidden';
//         bar.classList.remove('showbar', 'showbarinit');
//         bar.style.animationDuration = '';
//         // document.dispatchEvent(event);

//     }, {once: true});
// }

const clearHint = () => {

    // console.log("CLEARHINT");

    clearInterval(interval);

    clearTimeout(timer);

    let cells = document.querySelectorAll('.cell');

    document.querySelector('.numbers').classList.remove('display');

    // document.querySelector('.hint').src = 'images/lightbulb.svg';

    if (!aiMode()) {

        let hint = document.querySelector('.hint');

        hint.style.transition = '0.1s ease-in-out';
        
        hint.classList.remove('on');

        hint.addEventListener('transitionend', (e) => {

            let hint = e.currentTarget;

            hint.removeAttribute('style');
       
        }, {once: true}); 
    
    }

    // {
        // document.querySelector('.hint').classList.remove('on');
        // document.querySelector('.hint').classList.add('off');
    // }

    // let event = new Event('transitionend');

    // let bar = document.querySelector('.bar');

    // setTimeout(() => bar.classList.remove('showbar', 'showbarinit'), 10);

    // bar.classList.remove('showbar', 'showbarinit');

    for (let cell of cells) {
        if (cell.classList.contains('correct') || cell.classList.contains('incorrect')) {
            // cell.classList.remove('correct');
            cell.firstChild.innerText = '';
            // cell.style.animation = '';
            cell.style.animationDuration = '0.0s';
            cell.style.animationDelay = '0.0s';
            // cell.dispatchEvent(event);
        }

        // if (cell.classList.contains('incorrect')) cell.classList.add('stopbar');

        // cell.style.transition = `background-color 0s ease-in-out, font-weight 0s ease-in-out`;
        // cell.style = '';

        cell.style.transition = '';

        // cell.removeAttribute('style');
        cell.classList.remove('gray', 'bold', 'incorrect','correct', 'pop');
    }
}

const showHint = (e) => {

    // let bar = document.querySelector('.bar');

    // document.querySelector('.bar').classList.remove('showbar', 'showbarinit');

    console.log("SHOWHINT");

    // document.querySelector('.bar').classList.remove('showbar', 'showbarinit');

    if (solved(board)) {
        // console.log(interval);
        // if (!interval) firework();
        // if (!aiMode()) e.stopPropagation();

        // let bar = document.querySelector('.bar');
        // bar.style.animationDuration = '0.0s';

        aiMode() ? firework() : enableHints();

        return;
    }

    // setTimeout(() => bar.classList.remove('showbar', 'showbarinit'), 10);

    // disableHints();

    clearHint();

    // const resetHintBtn = (e) => {
       
    //     let hintEl = e.currentTarget;

    //     hintEl.style.opacity = 1;
    // }

    // document.querySelector('.hint').src = 'images/lightbulb2.svg';

    if (!aiMode()) document.querySelector('.hint').classList.add('on');
    // {
        // document.querySelector('.hint').classList.remove('off');
        // document.querySelector('.hint').classList.add('on');
    // }

    // hintEl.style.opacity = 0.5;

    // hintEl.src = 'images/lightbulb2.svg';


    // hintEl.addEventListener("touchend", resetHintBtn);
    // hintEl.addEventListener("touchcancel", resetHintBtn);
    // hintEl.addEventListener("mouseup", resetHintBtn);
    // hintEl.addEventListener("mouseleave", resetHintBtn);

    let cells = document.querySelectorAll('.cell');
    let [row, col, val, type, clues] = hint();
    let cell = cells[row * 9 + col];
    let delay = 0;

    // cells.forEach(cell => cell.classList.remove('select'));

    // bar.style.animationDuration = '0s';

    let boxRow = Math.trunc(row / 3) * 3;
    let boxCol = Math.trunc(col / 3) * 3;

    // disableTouch();
    // disableBar();

    for (let clue of clues.sort((a, b) => a - b)) {

        let boxRow2 = Math.trunc(Math.trunc(clue / 9) / 3) * 3;
        let boxCol2 = Math.trunc(clue % 9 / 3) * 3;
        let type2;

        cells[clue].style.transition = `font-weight 0.5s ${delay}s ease-in-out`;
        cells[clue].classList.add('bold');

        delay += 0.5;

        switch(type) {
            case 'row':
                type2 = boxRow == boxRow2 ? 'box' : 'col';
                break;
            case 'col':
                type2 = boxCol== boxCol2 ? 'box' : 'row';
                break;
            case 'box':
                type2 = boxRow == boxRow2 ? 'row' : 'col';
                break;
        }

        let i = 1; 

        switch(type2) {

            case 'row':
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

            case 'col':
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

            case 'box':

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

    // let repeats = aiMode() ? 4.37 : 5;

    let repeats = aiMode() ? 4.37 : 4.5;


    // repeats = 3;


    // cell.style.animation = 'hint 1s 5 ease forwards';

    cell.style.animation = `correct 0.75s ${repeats} ease forwards`;

    cell.style.transition = `all 1s linear`;


    cell.style.animationDelay = `${delay}s`;


    cell.classList.add('correct');

    // clues.forEach(clue => cells[clue].classList.add('bold'));

    // shadeSquares(row, col, val, num, clues);
            
    cell.addEventListener('animationend', e => {

        console.log("HINT ANI END");

        let cell = e.currentTarget;

        cell.classList.remove('correct');
        cell.firstChild.innerText = '';
        cell.style.animation = '';
        cell.style.animationDuration = '';

        // setTimeout(() => document.querySelector('.hint').src = 'images/lightbulb.svg', 200);

        // setTimeout(() => {

        if (!aiMode()) document.querySelector('.hint').classList.remove('on');

        // {
            // document.querySelector('.hint').classList.remove('on');
            // document.querySelector('.hint').classList.add('off');
        // }
    
        // }, 200);
        

        document.querySelectorAll('.gray, .bold').forEach(el => {
            el.style.transition = `background-color 0.2s ease-in-out, font-weight 0.2s ease-in-out`;
            el.classList.remove('gray', 'bold');
        });

        if (aiMode()) {
            cell.firstChild.innerText = val;
            cell.classList.add('filled');
            board[row][col] = val;
            solved(board) ? showHint() : setTimeout(showHint, 500);
            return;
        }



        // cells.forEach(cell => {
        //     cell.style.transition = `background-color 0.2s ease-in-out, font-weight 0.2s ease-in-out`;
        //     cell.classList.remove('gray')
        // });

        // clues.forEach(clue => cells[clue].classList.remove('bold'));

        // enableTouch();

        // console.log("SHOWHINT");

        // enableBar();

        enableHints();


    }, {once: true});



    // console.log(solve(board));
    // hints(board);
}

const rowClues = (row, col, val) => {

    // console.log(row, col, val);

    let clues = [];

    for (let i = 0; i < 9; i++) {

        if (board[row][i] != 0) continue;

        let boxRow = Math.trunc(row / 3) * 3;
        let boxCol = Math.trunc(i / 3) * 3;
        let squareClues = [];

        for (let j = 0; j < 9; j++) {

            let currentRow = boxRow + Math.trunc(j / 3);
            let currrentCol = boxCol + j % 3;

            if (board[currentRow][currrentCol] == val) squareClues.push(currentRow * 9 + currrentCol);
            if (board[j][i] == val) squareClues.push(j * 9 + i);
        }

        if (squareClues.length != 0) clues.push(squareClues);
    }

    return clues;
}

const colClues = (row, col, val) => {

    // console.log(row, col, val);

    let clues = [];

    for (let i = 0; i < 9; i++) {

        if (board[i][col] != 0) continue;

        let boxRow = Math.trunc(i / 3) * 3;
        let boxCol = Math.trunc(col / 3) * 3;
        let squareClues = [];

        for (let j = 0; j < 9; j++) {

            let currentRow = boxRow + Math.trunc(j / 3);
            let currrentCol = boxCol + j % 3;

            if (board[currentRow][currrentCol] == val) squareClues.push(currentRow * 9 + currrentCol);
            if (board[i][j] == val) squareClues.push(i * 9 + j);
        }

        if (squareClues.length != 0) clues.push(squareClues);
    }

    return clues;
}

const boxClues = (row, col, val) => {

    // console.log(row, col, val);

    let clues = [];
    let boxRow = Math.trunc(row / 3) * 3;
    let boxCol = Math.trunc(col / 3) * 3;

    for (let i = 0; i < 9; i++) {

        let squareClues = [];
        let currentRow = boxRow + Math.trunc(i / 3);
        let currrentCol = boxCol + i % 3;

        if (board[currentRow][currrentCol] != 0) continue;

        for (let j = 0; j < 9; j++) {
            if (board[currentRow][j] == val) squareClues.push(currentRow * 9 + j);
            if (board[j][currrentCol] == val) squareClues.push(j * 9 + currrentCol);
        }

        if (squareClues.length != 0) clues.push(squareClues);
    }

    return clues;
}

const hint = () => {

    hidden = [];

    checkBoxes(board, true);
    checkRows(board, true);
    checkCols(board, true);
    // checkCells(board, true);

    // console.log(singles);

    hidden.forEach(h => {

        let [row, col, val, type] = h;

        let clues;

        switch(type) {

            case 'row':
                clues = rowClues(row, col, val);
                break;
            case 'col':
                clues = colClues(row, col, val);
                break;
            case 'box':
                clues = boxClues(row, col, val);
                break;
        }

        clues = minArray(permuteArrays(clues));

        h.push(clues);

    });

    console.log(hidden);

    let h = hidden.reduce((prev, next) => prev[4].length > next[4].length ? next : prev);

    console.log(h);

    return h;
}

const selectDigit = (e) => {

    let digit = Number(e.currentTarget.innerText);
    let cells = document.querySelectorAll('.cell');
    let numbers = document.querySelector('.numbers');

    // let event = new Event('mousemove');

    // disableBar();
    // numbers.style.animationDuration = '0s';
    setTimeout(() => numbers.classList.remove('display'), 10);
    // numbers.style.display = 'none';

    for (let cell of cells) {
        if (cell.classList.contains('select')) {

            let [row, col] = cellCoords(cell);

            cell.classList.remove('select');

            cell.firstChild.innerText = digit;

            // return;

            if (cell.dataset.val == digit) {
                cell.classList.add('filled');
                board[row][col] = digit;

                console.log(cell);
                saveBoard();
                // if (!solved(board)) setTimeout(enableBar, 100);
            } else {
                // cell.firstElementChild.style.visibility = 'hidden';
                // cell.firstElementChild.style.opacity = 0;
                // cell.firstElementChild.style.color = 'firebrick';
                // cell.firstElementChild.style.animation = 'incorrect 1s 0.1s step-start 3';



                cell.classList.add('incorrect');

                cell.style.animation = 'incorrect 0.75s 3 ease forwards';

                cell.addEventListener('animationend', e => {

                    console.log("incorrectEND");

                    let cell = e.currentTarget;

                    cell.classList.remove('incorrect');
                    cell.firstChild.innerText = '';
                    cell.style.animation = '';
                    cell.style.animationDuration = '';

                    // if (!cell.classList.contains('stopbar')) showBar({auto: true});
                    // cell.classList.remove('stopbar');
                    // enableBar();

                }, {once: true});

            }
            break;
        }

        // document.querySelector('.numbers').classList.remove('display');

        // if (cell.classList.contains('filled')) document.dispatchEvent(event);

        // disableDigits();

    }

    if (solved(board)) {
        clearStorage();
        setTimeout(firework, 500)
    };

    // disableDigits();

    // e.stopPropagation();

    console.log(digit);
}

const reset = (e) => {

    // let bar = document.querySelector('.bar');
    let boardEl = document.querySelector('.board');

    clearHint();
    // setTimeout(() => clearHint, 10);
    // setTimeout(() => bar.classList.remove('showbar', 'showbarinit'), 10);

    localStorage.clear();

    // e.stopPropagation();

    // console.log(document.querySelector('.bar').classList.contains('showbar'));
    // bar.style.animationDuration = '0s';
    boardEl.removeEventListener('touchstart', reset);
    boardEl.removeEventListener('mousedown', reset);
    boardEl.style.cursor = 'default';

    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('filled');
        cell.firstChild.classList.remove('pop');
        cell => cell.style.cursor = 'default'
    });

    setTimeout(() => {

        console.log("RELOAD");

        initBoard();    
        fillGrid();
        console.table(board.map(arr => arr.slice()));
        // saveFilled(board); 
        removeDigits();

        readFromFile();

        saveFilled(solve()); 
        if (!aiMode()) saveBoard();
        console.table(board.map(arr => arr.slice()));
        solvable(true);
        fillBoard();

        // document.querySelector('.bar').style = '';
        // console.time('1');
        startTime = Date.now(); //
        if (aiMode()) {
            disableTouch();
            setTimeout(showHint, 500)
        } else {
            // enableHints();
            enableTouch();
        }   
    }, 50);

    
    // enableBar();
}

const firework = () => {

    // console.timeEnd('1');

    times.push(Number(((Date.now() - startTime) / 1000 / 60).toFixed(1)));

    console.log(times);
    console.log(times.reduce((a, b) => a + b, 0) / times.length);

    // alert(times.reduce((a, b) => a + b, 0) / times.length); //

    // console.log(((Date.now() - startTime) / 1000 / 60).toFixed(1));

    // disableTouch();

    // console.log('FIREWORK');

    let n = 0;

    let cells = document.querySelectorAll('.cell');

    for (let cell of cells) {
        cell.removeAttribute('style');
    }

    // disableHints();
    disableTouch();

    let order = Array.from({length: 81}, (_, i) => i);
    order = shuffle(order);
    // console.log(cells);

    const pop = () => {
        if (n > 80){
            // document.querySelector('.board').addEventListener('touchstart', reset);
            // document.querySelector('.board').addEventListener('mousedown', reset);
                    
            // document.querySelector('.board').addEventListener('touchstart', () => showBar());
            // document.querySelector('.board').addEventListener('mousedown', () => showBar());
            // document.querySelector('.board').style.cursor = 'pointer';
            // enableTouch();     
            clearInterval(interval);
            interval = null;
            // enableBar();
            // if (!aiMode()) {
            //     document.querySelector('.board').addEventListener('touchstart', () => showBar());
            //     document.querySelector('.board').addEventListener('mousedown', () => showBar());
            //     document.querySelector('.board').style.cursor = 'pointer';
            //     setTimeout(showBar, 1000, {auto: true});

            //     // enableTouch();              
            // } else {
                document.querySelector('.board').addEventListener('touchstart', reset);
                document.querySelector('.board').addEventListener('mousedown',  reset);
                document.querySelector('.board').style.cursor = 'pointer';
                document.querySelectorAll('.cell').forEach(cell => cell.style.cursor = 'pointer');

            // }

            // if (aiMode()) setTimeout(reset, 1000); //

        } else {
            cells[order[n]].firstChild.classList.add('pop');
            cells[order[n]].firstChild.addEventListener('animationend', e => {
                let cell = e.currentTarget;
                cell.classList.remove('pop');
                // cell.parentElement.style.cursor = 'default';
            });

            n++;
        }
    }

    interval = setInterval(pop, 100);
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

const disableTapZoom = () => {

    const preventDefault = (e) => e.preventDefault();

    document.body.addEventListener('touchstart', preventDefault, {passive: false});
    document.body.addEventListener('mousedown', preventDefault, {passive: false});
}


const enableHints = () => {

    let hint = document.querySelector('.hint');

    // const resetHintBtn = (e) => {
       
    //     let hint = e.currentTarget;

    //     hint.style.opacity = 1;
    // }

    if (touchScreen()){
        // hint.addEventListener("touchstart", showHint);

        hint.addEventListener("touchstart", () => {

            document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('select'));
    
            setTimeout(() => showHint(), 0);
        }, {once: true});

        // hint.addEventListener("touchend", resetHintBtn);
        // hint.addEventListener("touchcancel", resetHintBtn);
    } else {
        // hint.addEventListener("mousedown", showHint);

        hint.addEventListener("mousedown", () => {

            document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('select'));
    
            setTimeout(() => showHint(), 0);

        }, {once: true});



        // hint.addEventListener("mouseup", resetHintBtn);
    // hint.addEventListener("mouseleave", resetHintBtn);
        hint.style.cursor = 'pointer';
    }
}

// const disableHints = () => {

//     let hint = document.querySelector('.hint');

//     if (touchScreen()){
//         hint.removeEventListener("touchstart", showHint);
//     } else {
//         hint.removeEventListener("mousedown", showHint);
//         // hint.style.cursor = 'default';
//     }
// }

const enableTouch = () => {

    let cells = document.querySelectorAll('.cell');

    for (let cell of cells){
        if (touchScreen()){
            cell.addEventListener("touchstart", selectCell);
        } else {
            cell.addEventListener("mousedown", selectCell);
            cell.style.cursor = 'pointer';

        }
    }
}

const disableTouch = () => {

    let cells = document.querySelectorAll('.cell');

    for (let cell of cells){
        if (touchScreen()){
            cell.removeEventListener("touchstart", selectCell);
        } else {
            cell.removeEventListener("mousedown", selectCell);
            cell.style.cursor = 'default';
        }
    }
}


const enableKeys = () => document.addEventListener('keydown', e => {

    let digits = [1,2,3,4,5,6,7,8,9];
    let event = new Event('mousedown');
    let numbers = document.querySelectorAll('.number');

    console.log("KEY");

    let codes = ['Escape', 'Space', 'Enter'];

    if (codes.includes(e.code)) {

    //     if (aiMode() && (!solved(board) || interval)) return;
    //     if (solved(board) && interval) return;
    //     if (document.querySelector('.numbers').classList.contains('display')) return;

    //     if (document.querySelector('.bar').classList.contains('showbar') || 
    //         document.querySelector('.bar').classList.contains('showbarinit')) return;

        if (document.querySelector('.numbers').classList.contains('display')) return;

        if (aiMode() && solved(board) && !interval) {
            reset();
            return;}

        if (!aiMode()) showBar();
    
    }

    if (!document.querySelector('.numbers').classList.contains('display')) return;
    if (!digits.includes(Number(e.key))) return;

    numbers[Number(e.key) - 1].dispatchEvent(event);
});

const aiMode = () => {

    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let mode = urlParams.get('mode');
    
    return mode == 'ai';

    // return true; //
}

const readFromFile = () => {

    // let zero = '0';
    let abc ='abcdefghijklmnopqrstuvwxyz';
    // let board = [];

    let n = Math.trunc(Math.random() * sudokus.length);

    console.log(n);

    let sudoku = sudokus[n];
    // let sudoku = sudokus[n++];

    // let sudoku = sudokus[1525];

    console.log(sudoku);

    for (let i = 0; i < abc.length; i++) {
        
        let zeroes = '0'.repeat(i + 1); 
        let regex = new RegExp(abc[i], 'g');

        sudoku = sudoku.replace(regex, zeroes);   
    }
 
    console.log(sudoku);

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            board[i][j] = Number(sudoku[i * 9 + j]);
        }
    }

    // for (let i = 0; i < 9; i++) {
    //     [board[i][4], board[i][5]] = [board[i][5], board[i][4]];
    // }

    console.table(board);
}

const init = () => {

    // window.addEventListener('visibilitychange', () => {
    //     console.log("VISIBILITY CHANGE")
    // }, false);

    // window.addEventListener('pagehide', () => {
    //     console.log("PAGE HIDE")
    // }, false);

    // window.addEventListener('focus', () => {
    //     console.log("FOCUS")
    // }, false);

    // window.addEventListener('blur', () => {
    //     console.log("BLUR")
    // }, false);

    // window.addEventListener('pageshow', () => {
    //     console.log("PAGE SHOW")
    // }, false);

    disableTapZoom();
    setBoardSize();


    initBoard();
    
    solvable(true);

    let t0 = performance.now();

    fillGrid();

    console.table(board.map(arr => arr.slice()));


    // saveFilled(board); 

    let t1 = performance.now();

    removeDigits();

    let t2 = performance.now();

    readFromFile();

    // board = solve(); //
    // board[7][7] = 0; //

    saveFilled(solve()); 


    if (!aiMode()) checkStorage();

    console.table(board.map(arr => arr.slice()));

    saveBoard();


    // console.log(board.map(arr => arr.slice()));


    // save(); 

    // console.table(board);

    fillBoard();

    // setTimeout(() => {

        showBoard();

        // initBar();

        enableKeys();

        if (aiMode()) {
            // disableTouch();
            // document.querySelector('.hint').classList.remove('off');
            document.querySelector('.hint').classList.add('on');
        
            setTimeout(showHint, 2000);
            // console.time('1');
            startTime = Date.now();

        } else {

            // setTimeout(showBar, 1000, {auto: true});
            enableTouch();
            // enableKeys();
            enableDigits();
            // enableBar();

            enableHints();

            timer = setTimeout(() => document.querySelector('.hint').classList.remove('on'), 1000)
        }

        // setTimeout(screenshot5, 2000);

        // setTimeout(preview, 2000);


        // setTimeout(showBar, 1000, true);


        // enableTouch();
        // enableDigits();
        // enableBar();

        console.table(solve().map(arr => arr.slice()));

        solvable(true);


        console.table(board);

        console.log(t1 - t0);
        console.log(t2 - t1);
        // console.log(countFilled(board));
    // }, 500);
}

window.onload = () => document.fonts.ready.then(init());