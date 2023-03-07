let board = [];
// let hiddens = [];

let startTime; //
let times = []; //

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(reg => {
                console.log('Service worker registered!', reg);
            })
            .catch(err => {
                console.log('Service worker registration failed: ', err);
            });
    });
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
    //     localStorage.setItem('solved', JSON.stringify(solved));
    // }
    if (aiMode()) return;
    
    let boardExp = {

        board,
        // expiry: Date.now() + 604800000; // 1000 * 60 * 60 * 24 * 7
        expiry: Date.now() + 1000 * 60 * 60 * 24 * 7
    }

    // localStorage.setItem('board', JSON.stringify(board));

    localStorage.setItem('board', JSON.stringify(boardExp));
}

const checkStorage = () => {

    if (aiMode()) return;

    // if (localStorage.getItem('board') != null) {

    //     let solved = JSON.parse(localStorage.getItem('solved'));

    //     board = JSON.parse(localStorage.getItem('board'));

    //     saveSolution(solved);
    // }

    if (localStorage.getItem('board') != null) {

        let boardStr = JSON.parse(localStorage.getItem('board'));

        if (Date.now() > boardStr.expiry) return;
        
        // if (Date.now() > boardStr.expiry) {
        //     clearStorage();
        //     return;
        // }

        board = boardStr.board;

        // let solved = solve();

        // saveSolution();
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

const validDigit = (board, row, col, val) => {

    let boxRow = Math.trunc(row / 3) * 3;
    let boxCol = Math.trunc(col / 3) * 3;

    for (let i = 0; i < 9; i++) {

        if (board[row][i] == val || board[i][col] == val) return false;

        let currentRow = boxRow + Math.trunc(i / 3);
        let currentCol = boxCol + i % 3;

        if (board[currentRow][currentCol] == val) return false;
    }

    return true;
}

const checkRows = (board, {hint = false} = {}, hiddens = []) => {

    for (let row = 0; row < 9; row++) {
        outer: for (let val = 1; val <= 9; val++) {

            let r, c;

            for (let col = 0; col < 9; col++) {

                if (board[row][col] != 0 || !validDigit(board, row, col, val)) continue;

                if (r != undefined) continue outer;

                [r, c] = [row, col];
            }

            if (r != undefined) {
                if (!hint) return [r, c, val, 'row'];
                hiddens.push([r, c, val, 'row'])
            }
        }
    }

    return [null, null, null, null];
}

const checkCols = (board, {hint = false} = {}, hiddens = []) => {

    for (let col = 0; col < 9; col++) {
        outer: for (let val = 1; val <= 9; val++) {

            let r, c;

            for (let row = 0; row < 9; row++) {

                if (board[row][col] != 0 || !validDigit(board, row, col, val)) continue;

                if (r != undefined) continue outer;

                [r, c] = [row, col];
            }

            if (r != undefined) {
                if (!hint) return [r, c, val, 'col'];
                hiddens.push([r, c, val, 'col'])
            }
        }
    }

    return [null, null, null, null];
}

const checkBoxes = (board, {hint = false} = {}, hiddens = []) => {

    for (let box = 0; box < 9; box++) {
        outer: for (let val = 1; val <= 9; val++) {

            let r, c; 
            let boxRow = Math.trunc(box / 3) * 3;
            let boxCol = box % 3 * 3;

            for (let cell = 0; cell < 9; cell++) {

                let row = boxRow + Math.trunc(cell / 3);
                let col = boxCol + cell % 3;

                if (board[row][col] != 0 || !validDigit(board, row, col, val)) continue;

                if (r != undefined) continue outer;

                [r, c] = [row, col];
            }

            if (r != undefined) {
                if (!hint) return [r, c, val, 'box'];
                hiddens.push([r, c, val, 'box'])
            }
        }
    }

    return [null, null, null, null];
}

const findDigit = (board) => {

    let row, col, val, type;

    [row, col, val, type] = checkBoxes(board);
    if (row != null) return [row, col, val, type];

    [row, col, val, type] = checkRows(board);
    if (row != null) return [row, col, val, type];

    [row, col, val, type] = checkCols(board);
    if (row != null) return [row, col, val, type];

    return [null, null, null, null];
}

const solved = (board) => {

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] == 0) return false;
        }
    }

    return true;
}

// const solve = () => {

//     let tempBoard = board.map(arr => arr.slice());

//     do {

//         let [row, col, val, _] = findDigit(tempBoard);

//         if (row == null) return false;

//         tempBoard[row][col] = val;

//     } while(!solved(tempBoard));

//     return tempBoard;
// }

const getData = () => {

    let abc ='abcdefghijklmnopqrstuvwxyz';
    let n = Math.trunc(Math.random() * sudokus.length);
    let sudoku = sudokus[n];
    // let sudoku = sudokus[1525];
    board = [[],[],[],[],[],[],[],[],[]];

    for (let i = 0; i < abc.length; i++) {
        
        let zeroes = '0'.repeat(i + 1); 
        let regex = new RegExp(abc[i], 'g');

        sudoku = sudoku.replace(regex, zeroes);   
    }
 
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            board[i][j] = Number(sudoku[i * 9 + j]);
        }
    }
}

const saveSolution = () => {

    // let tempBoard = solve();
    let cells = document.querySelectorAll('.cell');
    let tempBoard = board.map(arr => arr.slice());

    do {

        let [row, col, val, _] = findDigit(tempBoard);

        if (val == null) break;

        tempBoard[row][col] = val;

    } while(!solved(tempBoard));

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            cells[row * 9 + col].dataset.val = tempBoard[row][col];
        }
    }
}

const fillBoard = () => {

    let flatBoard = board.flat();

    document.querySelectorAll('.cell').forEach(cell => {

        let val = flatBoard.shift();

        if (val) {
            cell.firstChild.innerText = val;
            cell.classList.add('filled');
        } else {
            cell.firstChild.innerText = '';
        }
    });
}

const selectCell = (e) => {

    if (solved(board)) return;

    let cell = e.currentTarget;
    let cells = document.querySelectorAll('.cell');
    let numbers = document.querySelector('.numbers');

    clearHint();

    // let [row, col] = cellCoords(cell);

    // let val = Number(cell.dataset.val);

    // console.log(row, col, val);

    if (cell.classList.contains('filled')) { 

        cells.forEach(cell => cell.classList.remove('select'));

        // for (let cell of cells) {
        //     cell.classList.remove('select');
        // }

        numbers.classList.remove('display');

        return;
    }

    if (cell.classList.contains('select')) {

        cell.classList.remove('select');
        numbers.classList.remove('display');

        return;
    } 

    cells.forEach(cell => cell.classList.remove('select'));

    // for (let cell of cells) {
    //     cell.classList.remove('select');
    // }

    cell.classList.add('select');

    numbers.classList.remove('display');

    setTimeout(() => numbers.classList.add('display'), 0);
}

const clearHint = () => {

    let cells = document.querySelectorAll('.cell');

    document.querySelector('.numbers').classList.remove('display');

    if (!aiMode()) {

        let hint = document.querySelector('.hint');

        hint.style.transition = '0.1s ease-in-out';
        
        hint.classList.remove('on');

        hint.addEventListener('transitionend', (e) => {

            let hint = e.currentTarget;

            hint.style.transition = '';
       
        }, {once: true}); 
    
    }

    for (let cell of cells) {
        if (cell.classList.contains('correct') || cell.classList.contains('incorrect')) {
            cell.firstChild.innerText = '';
            cell.style.animationDuration = '0.0s';
            cell.style.animationDelay = '0.0s';
        }

        cell.style.transition = '';

        cell.classList.remove('gray', 'bold', 'incorrect','correct', 'pop');
    }
}

const showHint = (e) => {

    if (solved(board)) return;

    if (document.querySelector('.hint').classList.contains('on') && !aiMode()) return;
    
    clearHint();

    if (!aiMode()) document.querySelector('.hint').classList.add('on');

    let cells = document.querySelectorAll('.cell');
    let [row, col, val, type, clues] = hint();
    let cell = cells[row * 9 + col];
    let boxRow = Math.trunc(row / 3) * 3;
    let boxCol = Math.trunc(col / 3) * 3;
    let delay = 0;

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
        
                while (clue % 9 + i < 9 || clue % 9 - i >= 0) {

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

                delay += 0.5;

                break;

            case 'col':

                while (Math.trunc(clue / 9) + i < 9 || Math.trunc(clue / 9) - i >= 0) {

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

                delay += 0.5;

                break;

            case 'box':

                let offsets = [0,1,2,9,10,11,18,19,20]; 

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

                for (let batch of sequence) {
                    for (let i of batch) {
                
                        let currentRow = boxRow2 + Math.trunc(i / 3);
                        let currentCol = boxCol2 + i % 3;

                        if (currentRow != Math.trunc(clue / 9) || currentCol != clue % 9) cells[currentRow * 9 + currentCol].style.transition = `background-color 0.5s ${delay}s ease-in-out`;
                        if (currentRow != Math.trunc(clue / 9) || currentCol != clue % 9) cells[currentRow * 9 + currentCol].classList.add('gray');
                    }

                    delay += 0.1;
                }

                delay += 0.5;

                break;
        }
    }

    cell.firstChild.innerText = val;

    // let repeats = aiMode() ? 4.37 : 5;
    let repeats = aiMode() ? 4.37 : 4.5;
    // repeats = 3;

    cell.style.animation = `correct 0.75s ${repeats} ease forwards`;
    // cell.style.transition = `all 1s linear`;
    cell.style.animationDelay = `${delay}s`;
    cell.classList.add('correct');
            
    cell.addEventListener('animationend', e => {

        let cell = e.currentTarget;

        cell.classList.remove('correct');
        cell.firstChild.innerText = '';
        cell.style.animation = '';
        cell.style.animationDuration = '';

        if (!aiMode()) document.querySelector('.hint').classList.remove('on');        

        document.querySelectorAll('.gray, .bold').forEach(cell => {
            cell.style.transition = `background-color 0.2s ease-in-out, font-weight 0.2s ease-in-out`;
            cell.classList.remove('gray', 'bold');
        });

        if (aiMode()) {
            cell.firstChild.innerText = val;
            cell.classList.add('filled');
            board[row][col] = val;
            solved(board) ? firework() : setTimeout(showHint, 500);
        }
    }, {once: true});
}

const rowClues = (row, col, val) => {

    let clues = [];

    for (let i = 0; i < 9; i++) {

        if (board[row][i] != 0) continue;

        let boxRow = Math.trunc(row / 3) * 3;
        let boxCol = Math.trunc(i / 3) * 3;
        let squareClues = [];

        for (let j = 0; j < 9; j++) {

            let currentRow = boxRow + Math.trunc(j / 3);
            let currentCol = boxCol + j % 3;

            if (board[currentRow][currentCol] == val) squareClues.push(currentRow * 9 + currentCol);
            if (board[j][i] == val) squareClues.push(j * 9 + i);
        }

        if (squareClues.length != 0) clues.push(squareClues);
    }

    return clues;
}

const colClues = (row, col, val) => {

    let clues = [];

    for (let i = 0; i < 9; i++) {

        if (board[i][col] != 0) continue;

        let boxRow = Math.trunc(i / 3) * 3;
        let boxCol = Math.trunc(col / 3) * 3;
        let squareClues = [];

        for (let j = 0; j < 9; j++) {

            let currentRow = boxRow + Math.trunc(j / 3);
            let currentCol = boxCol + j % 3;

            if (board[currentRow][currentCol] == val) squareClues.push(currentRow * 9 + currentCol);
            if (board[i][j] == val) squareClues.push(i * 9 + j);
        }

        if (squareClues.length != 0) clues.push(squareClues);
    }

    return clues;
}

const boxClues = (row, col, val) => {

    let clues = [];
    let boxRow = Math.trunc(row / 3) * 3;
    let boxCol = Math.trunc(col / 3) * 3;

    for (let i = 0; i < 9; i++) {

        let squareClues = [];
        let currentRow = boxRow + Math.trunc(i / 3);
        let currentCol = boxCol + i % 3;

        if (board[currentRow][currentCol] != 0) continue;

        for (let j = 0; j < 9; j++) {
            if (board[currentRow][j] == val) squareClues.push(currentRow * 9 + j);
            if (board[j][currentCol] == val) squareClues.push(j * 9 + currentCol);
        }

        if (squareClues.length != 0) clues.push(squareClues);
    }

    return clues;
}

const hint = () => {

    let hiddens = [];

    checkBoxes(board, {hint: true}, hiddens);
    checkRows(board, {hint: true}, hiddens);
    checkCols(board, {hint: true}, hiddens);

    hiddens.forEach(hidden => {

        let [row, col, val, type] = hidden;

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

        hidden.push(clues);

    });

    let hidden = hiddens.reduce((prev, next) => prev[4].length > next[4].length ? next : prev);

    return hidden;
}

const selectDigit = (e) => {

    let digit = Number(e.currentTarget.innerText);
    let cells = document.querySelectorAll('.cell');
    let numbers = document.querySelector('.numbers');

    setTimeout(() => numbers.classList.remove('display'), 10);

    for (let cell of cells) {

        if (cell.classList.contains('select')) {

            let [row, col] = cellCoords(cell);

            cell.classList.remove('select');
            cell.firstChild.innerText = digit;

            if (cell.dataset.val == digit) {
                cell.classList.add('filled');
                board[row][col] = digit;
                saveBoard();
            } else {
                
                cell.classList.add('incorrect');
                cell.style.animation = 'incorrect 0.75s 3 ease forwards';

                cell.addEventListener('animationend', e => {

                    let cell = e.currentTarget;

                    cell.classList.remove('incorrect');
                    cell.firstChild.innerText = '';
                    cell.style.animation = '';
                    cell.style.animationDuration = '';
                }, {once: true});

            }

            break;
        }
    }

    if (solved(board)) {
        clearStorage();
        setTimeout(firework, 500);
    }
}

const reset = () => {

    let boardEl = document.querySelector('.board');

    clearHint();
    // if (!aiMode()) clearStorage();
    boardEl.removeEventListener('touchstart', reset);
    boardEl.removeEventListener('mousedown', reset);
    boardEl.style.cursor = 'default';

    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('filled');
        // cell.firstChild.classList.remove('pop');
        cell.style.cursor = 'default'
    });

    setTimeout(() => {

        // initBoard();    
        getData();
        saveSolution(); 
        fillBoard();

        startTime = Date.now(); //

        // if (aiMode()) {
        //     // disableTouch();
        //     setTimeout(showHint, 500)
        // } else {
        //     saveBoard();
        //     // enableTouch();
        // }   

        aiMode() ? setTimeout(showHint, 500) :  saveBoard();

    }, 50);    
}

const firework = () => {

    times.push(Number(((Date.now() - startTime) / 1000 / 60).toFixed(1))); //
    console.log(times); //
    console.log(times.reduce((a, b) => a + b, 0) / times.length); //

    let n = 0;
    let cells = document.querySelectorAll('.cell');

    cells.forEach(cell => cell.removeAttribute('style'));

    // for (let cell of cells) {
    //     cell.removeAttribute('style');
    // }

    // disableTouch();

    let order = Array.from({length: 81}, (_, i) => i);
    order = shuffle(order);

    const pop = () => {

        if (n > 80){
            
            clearInterval(interval);
            
            document.querySelector('.board').addEventListener('touchstart', reset);
            document.querySelector('.board').addEventListener('mousedown',  reset);

            document.querySelector('.board').style.cursor = 'pointer';
            cells.forEach(cell => cell.style.cursor = 'pointer');

            if (aiMode()) setTimeout(reset, 1000); //

        } else {

            cells[order[n]].firstChild.classList.add('pop');

            cells[order[n]].firstChild.addEventListener('animationend', e => {

                let cell = e.currentTarget;

                cell.classList.remove('pop');
            });

            n++;
        }
    }

    let interval = setInterval(pop, 100);
}

const enableDigits = () => {

    if (aiMode()) return;

    let digits = document.querySelectorAll('.number');

    for (let digit of digits){
        if (touchScreen()){
            digit.addEventListener("touchstart", selectDigit);
        } else {
            digit.addEventListener("mousedown", selectDigit);
        }
    }
}

const enableHints = () => {

    if (aiMode()) return;

    let hint = document.querySelector('.hint');

    if (touchScreen()){

        hint.addEventListener("touchstart", () => {

            document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('select'));
    
            setTimeout(() => showHint(), 0);
        });

    } else {

        hint.addEventListener("mousedown", () => {

            document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('select'));
    
            setTimeout(() => showHint(), 0);
        });

        hint.style.cursor = 'pointer';
    }

    setTimeout(() => hint.classList.remove('on'), 1000);
}

const enableTouch = () => {

    if (aiMode()) return;

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

const enableKeys = () => document.addEventListener('keydown', e => {

    let digits = [1,2,3,4,5,6,7,8,9];
    let event = new Event('mousedown');
    let numbers = document.querySelectorAll('.number');
    let boardEl = document.querySelector('.board');
    let codes = ['Escape', 'Space', 'Enter'];

    if (codes.includes(e.code) && solved(board)) boardEl.dispatchEvent(event);
    if (!document.querySelector('.numbers').classList.contains('display')) return;
    if (!digits.includes(Number(e.key))) return;

    numbers[Number(e.key) - 1].dispatchEvent(event);
});

const disableTapZoom = () => {

    const preventDefault = (e) => e.preventDefault();

    document.body.addEventListener('touchstart', preventDefault, {passive: false});
    document.body.addEventListener('mousedown', preventDefault, {passive: false});
}

const aiMode = () => {

    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let mode = urlParams.get('mode');
    
    return mode == 'ai';

    // return true; //
}

const init = () => {

    disableTapZoom();
    setBoardSize();
    // initBoard();
    getData();

    // if (!aiMode()) checkStorage();

    checkStorage();

    saveSolution(); 
    
    saveBoard();

    fillBoard();
    showBoard();
    enableKeys();

    enableTouch();
    enableDigits();
    enableHints();

    // if (aiMode()) setTimeout(showHint, 2000);

    if (aiMode()) {
        setTimeout(showHint, 2000);
        startTime = Date.now(); //
    }

    // setTimeout(screenshot5, 2000);

    // setTimeout(preview, 2000);
}

window.onload = () => document.fonts.ready.then(init());