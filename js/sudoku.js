let board = [];

const showBoard = () => document.body.style.opacity = 1;

const clearStorage = () => localStorage.removeItem('sudoku-board');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getMinArray = (arrays) => arrays.reduce((prev, next) => prev.length > next.length ? next : prev);

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

    arrays[0].forEach(el => {

        let rest = permuteArrays(arrays.slice(1));

        rest.forEach(permutation => result.push([...new Set([el].concat(permutation))]));
    });

    return result.sort((a, b) => a - b);
}

const setBoardSize = () => {

    let minSide = screen.height > screen.width ? screen.width : window.innerHeight;
    let cssBoardSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--board-size')) / 100;
    let boardSize = Math.ceil(minSide * cssBoardSize / 9) * 9;

    document.documentElement.style.setProperty('--board-size', boardSize + 'px');
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

const checkRows = (board, hiddens = [], hint = false) => {

    for (let row = 0; row < 9; row++) {
        outer: for (let val = 1; val <= 9; val++) {

            let r, c;

            for (let col = 0; col < 9; col++) {

                if (board[row][col] != 0 || !validDigit(board, row, col, val)) continue;
                if (r != undefined) continue outer;

                [r, c] = [row, col];
            }

            if (r == undefined) continue;
            if (!hint) return [r, c, val, 'row'];

            hiddens.push([r, c, val, 'row']);
        }
    }

    return [null, null, null, null];
}

const checkCols = (board, hiddens = [], hint = false) => {

    for (let col = 0; col < 9; col++) {
        outer: for (let val = 1; val <= 9; val++) {

            let r, c;

            for (let row = 0; row < 9; row++) {

                if (board[row][col] != 0 || !validDigit(board, row, col, val)) continue;
                if (r != undefined) continue outer;

                [r, c] = [row, col];
            }

            if (r == undefined) continue;
            if (!hint) return [r, c, val, 'col'];

            hiddens.push([r, c, val, 'col']);
        }
    }

    return [null, null, null, null];
}

const checkBoxes = (board, hiddens = [], hint = false) => {

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

            if (r == undefined) continue;
            if (!hint) return [r, c, val, 'box'];

            hiddens.push([r, c, val, 'box']);
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

const puzzleSolved = (board) => {

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] == 0) return false;
        }
    }

    return true;
}

const getRowClues = (row, _, val) => {

    let clues = [];

    for (let i = 0; i < 9; i++) {

        if (board[row][i] != 0) continue;

        let squareClues = [];
        let boxRow = Math.trunc(row / 3) * 3;
        let boxCol = Math.trunc(i / 3) * 3;

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

const getColClues = (_, col, val) => {

    let clues = [];

    for (let i = 0; i < 9; i++) {

        if (board[i][col] != 0) continue;

        let squareClues = [];
        let boxRow = Math.trunc(i / 3) * 3;
        let boxCol = Math.trunc(col / 3) * 3;

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

const getBoxClues = (row, col, val) => {

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

const getHint = () => {

    let hiddens = [];

    checkBoxes(board, hiddens, true);
    checkRows(board, hiddens, true);
    checkCols(board, hiddens, true);

    hiddens.forEach(hidden => {

        let clues;
        let [row, col, val, type] = hidden;

        switch(type) {

            case 'row':
                clues = getRowClues(row, col, val);
                break;
            case 'col':
                clues = getColClues(row, col, val);
                break;
            case 'box':
                clues = getBoxClues(row, col, val);
                break;
        }

        clues = getMinArray(permuteArrays(clues));
        
        hidden.push(clues);
    });

    let hidden = hiddens.reduce((prev, next) => prev[4].length > next[4].length ? next : prev);

    return hidden;
}

const clearSelection = () => {

    let numpad = document.querySelector('.numpad');
    let selected = document.querySelector('.selected');

    if (selected) {
        numpad.classList.remove('display');
        selected.classList.remove('selected');
    }
}

const clearHint = () => {

    let bulb = document.querySelector('.bulb');
    let correct = document.querySelector('.correct');
    let incorrect = document.querySelector('.incorrect');
    let event = new CustomEvent('animationend', {detail: {}});
   
    if (!aiMode()) bulb.classList.remove('on');
    if (correct) correct.dispatchEvent(event);
    if (incorrect) incorrect.dispatchEvent(event);
}

const showHint = async () => {

    let bulb = document.querySelector('.bulb');

    if (puzzleSolved(board) || (bulb.classList.contains('on') && !aiMode())) return;

    clearHint();
    clearSelection();

    await sleep(0);

    let delay = 0;
    let cells = document.querySelectorAll('.cell');
    let [row, col, val, type, clues] = getHint();
    let cell = cells[row * 9 + col];
    let boxRow = Math.trunc(row / 3) * 3;
    let boxCol = Math.trunc(col / 3) * 3;

    for (let clue of clues.sort((a, b) => a - b)) {

        let i = 1; 
        let type2;
        let boxRow2 = Math.trunc(Math.trunc(clue / 9) / 3) * 3;
        let boxCol2 = Math.trunc(clue % 9 / 3) * 3;

        cells[clue].style.transitionDelay = `${delay}s`;
        cells[clue].classList.add('bold');

        delay += 0.5;

        switch(type) {
            case 'row':
                type2 = boxRow == boxRow2 ? 'box' : 'col';
                break;
            case 'col':
                type2 = boxCol == boxCol2 ? 'box' : 'row';
                break;
            case 'box':
                type2 = boxRow == boxRow2 ? 'row' : 'col';
                break;
        }

        switch(type2) {

            case 'row':
        
                while (clue % 9 + i < 9 || clue % 9 - i >= 0) {

                    let n = Math.trunc(clue / 9) * 9 + clue % 9 + i;

                    if (clue % 9 + i < 9 && !cells[n].classList.contains('shade')) {
                        cells[n].classList.add('shade');
                        cells[n].style.transitionDelay = `${delay}s`;
                    }

                    n = Math.trunc(clue / 9) * 9 + clue % 9 - i;
                    
                    if (clue % 9 - i >= 0 && !cells[n].classList.contains('shade')) {
                        cells[n].classList.add('shade');
                        cells[n].style.transitionDelay = `${delay}s`;
                    }

                    delay += 0.1;
                    i++;
                }

                delay += 0.5;

                break;

            case 'col':

                while (Math.trunc(clue / 9) + i < 9 || Math.trunc(clue / 9) - i >= 0) {

                    let n = (Math.trunc(clue / 9) + i) * 9 + clue % 9;

                    if (Math.trunc(clue / 9) + i < 9 && !cells[n].classList.contains('shade')) {
                        cells[n].classList.add('shade');
                        cells[n].style.transitionDelay = `${delay}s`;
                    }

                    n = (Math.trunc(clue / 9) - i) * 9 + clue % 9;
                    
                    if (Math.trunc(clue / 9) - i >= 0 && !cells[n].classList.contains('shade')) {
                        cells[n].classList.add('shade');
                        cells[n].style.transitionDelay = `${delay}s`;
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
                        let n = currentRow * 9 + currentCol;

                        if (currentRow != Math.trunc(clue / 9) || currentCol != clue % 9) {
                            cells[n].classList.add('shade');
                            cells[n].style.transitionDelay = `${delay}s`;
                        }
                    }

                    delay += 0.1;
                }

                delay += 0.5;

                break;
        }
    }

    bulb.classList.add('on');
    cell.classList.add('correct');
    cell.firstChild.innerText = val;
    cell.style.animationDelay = `${delay}s`;

    if (aiMode()) cell.style.animationIterationCount = 4.37;

    cell.addEventListener('animationend', (e) => {

        let forcedEnd = e.detail != undefined;
        let cells = document.querySelectorAll('.shade, .bold');

        cell.firstChild.innerText = '';
        cell.classList.remove('correct');
        cell.style.removeProperty('animation-delay');
        cell.style.removeProperty('animation-iteration-count');

        cells.forEach(cell => {

            if (!forcedEnd) {
                cell.classList.add('clear');
                cell.addEventListener('transitionend', () => cell.classList.remove('clear'), {once: true});
            }

            cell.classList.remove('shade', 'bold');
            cell.style.removeProperty('transition-delay');
        });

        if (aiMode()) {
            board[row][col] = val;
            cell.firstChild.innerText = val;
            cell.classList.add('filled');
            puzzleSolved(board) ? endGame() : setTimeout(showHint, 500);
            return;
        }

        bulb.classList.remove('on');

    }, {once: true});
}

const selectCell = async (e) => {

    let cell = e.currentTarget;
    let numpad = document.querySelector('.numpad');
    let selected = document.querySelector('.selected');
    let filled = [...document.querySelectorAll('.filled')];

    clearHint();
    clearSelection();

    if (cell == selected || filled.includes(cell)) return;
    
    await sleep(0);

    cell.classList.add('selected');
    numpad.classList.add('display');
}

const selectDigit = async (e) => {

    let digit = Number(e.currentTarget.innerText);
    let cell = document.querySelector('.selected');
    let cells = document.querySelectorAll('.cell');
    let index = [...cells].indexOf(cell);
    let [row, col] = [Math.trunc(index / 9), index % 9];

    clearSelection();

    cell.firstChild.innerText = digit;

    if (Number(cell.dataset.val) != digit) {

        cell.classList.add('incorrect');

        cell.addEventListener('animationend', () => {

            cell.firstChild.innerText = '';
            cell.classList.remove('incorrect');
            
        }, {once: true});

        return;
    }

    cell.classList.add('filled');
    board[row][col] = digit;
    saveBoard();

    if (puzzleSolved(board)) {
        clearStorage();
        await sleep(500);
        endGame();
    }
}

const checkStorage = () => {

    const nPuzzle = () => {

        let sequence = JSON.parse(localStorage.getItem('sudoku-seq'));
    
        if (sequence == null || sequence.length == 0) {
            sequence = shuffle([...Array(puzzles.length).keys()]);
        }
    
        let n = sequence.shift();

        localStorage.setItem('sudoku-seq', JSON.stringify(sequence));
    
        return n;
    }

    if (aiMode()) return nPuzzle();

    if (localStorage.getItem('sudoku-board') != null) {

        let boardStr = JSON.parse(localStorage.getItem('sudoku-board'));

        if (Date.now() > boardStr.expiry) return nPuzzle();

        board = boardStr.board;

        return null;
    }

    return nPuzzle();
}

const getPuzzle = () => {

    let n = checkStorage();
    let abc ='abcdefghijklmnopqrstuvwxyz';

    if (n == null) return;

    let puzzle = puzzles[n];

    board = [[],[],[],[],[],[],[],[],[]];

    for (let i = 0; i < abc.length; i++) {
        
        let zeroes = '0'.repeat(i + 1); 
        let regex = new RegExp(abc[i], 'g');

        puzzle = puzzle.replace(regex, zeroes);
    }
 
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            board[row][col] = Number(puzzle[row * 9 + col]);
        }
    }
}

const saveSolution = () => {

    let tempBoard = board.map(arr => arr.slice());
    let cells = document.querySelectorAll('.cell');

    do {

        let [row, col, val, _] = findDigit(tempBoard);

        if (val == null) break;

        tempBoard[row][col] = val;

    } while(!puzzleSolved(tempBoard));

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            cells[row * 9 + col].dataset.val = tempBoard[row][col];
        }
    }
}

const saveBoard = () => {

    if (aiMode()) return;
    
    let boardExp = {

        board,
        expiry: Date.now() + 1000 * 60 * 60 * 24 * 7
    }

    localStorage.setItem('sudoku-board', JSON.stringify(boardExp));
}

const fillBoard = () => {

    let board1D = board.flat();
    let cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {

        let val = board1D.shift();

        if (val == 0) return;

        cell.firstChild.innerText = val;
        cell.classList.add('filled');
    });
}

const newGame = async () => {

    let bulb = document.querySelector('.bulb');
    let board = document.querySelector('.board');
    let cells = document.querySelectorAll('.cell');

    board.classList.remove('enabled');
    board.removeEventListener('touchstart', newGame);
    board.removeEventListener('mousedown', newGame);
    document.removeEventListener('keydown', newGame);

    cells.forEach(cell => {
        cell.firstChild.innerText = '';
        cell.classList.remove('filled');
    });

    await sleep(100);

    getPuzzle();
    saveSolution(); 
    fillBoard();

    if (aiMode()) {
        bulb.classList.add('on');
        await sleep(500);
        showHint();
        return;
    }
    
    bulb.classList.add('enabled');
    saveBoard();
}

const endGame = () => {

    let bulb = document.querySelector('.bulb');
    let board = document.querySelector('.board');
    let numbers = shuffle([...document.querySelectorAll('.number')]);

    bulb.classList.remove('on', 'enabled');

    let firework = setInterval(() => {

        if (numbers.length == 0) {

            clearInterval(firework);

            board.classList.add('enabled');
            board.addEventListener('touchstart', newGame);
            board.addEventListener('mousedown', newGame);
            document.addEventListener('keydown', newGame);

            return;
        }

        let number = numbers.shift();

        number.classList.add('pop');

        number.addEventListener('animationend', () => number.classList.remove('pop'), {once: true});

    }, 100);
}

const aiMode = () => {

    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let mode = urlParams.get('mode');
    
    return mode == 'ai';
}

const enableTouch = () => {

    if (aiMode()) return;

    let cells = document.querySelectorAll('.cell');

    for (let cell of cells){
        cell.classList.add('enabled');
        cell.addEventListener('touchstart', selectCell);
        cell.addEventListener('mousedown', selectCell);
    }
}

const enableNumPad = () => {

    if (aiMode()) return;

    let digits = document.querySelectorAll('.digit');

    for (let digit of digits){
        digit.addEventListener('touchstart', selectDigit);
        digit.addEventListener('mousedown', selectDigit);
    }
}

const enableKeys = () => document.addEventListener('keydown', e => {

    let range = '123456789';
    let event = new Event('mousedown');
    let digits = document.querySelectorAll('.digit');
    let selected = document.querySelector('.selected');

    if (selected && range.includes(e.key)) digits[range.indexOf(e.key)].dispatchEvent(event);
});

const enableHints = () => {

    let bulb = document.querySelector('.bulb');
    let mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    mediaQuery.addEventListener('change', clearHint);

    if (aiMode()) return;

    bulb.classList.add('enabled');
    bulb.addEventListener('touchstart', showHint);
    bulb.addEventListener('mousedown', showHint);
}

const blinkBulb = async () => {

    let bulb = document.querySelector('.bulb');

    bulb.classList.add('on');

    if (aiMode()) return;

    await sleep(1000);

    bulb.classList.remove('on');
}

const disableTapZoom = () => {

    const preventDefault = (e) => e.preventDefault();

    document.body.addEventListener('touchstart', preventDefault, {passive: false});
    document.body.addEventListener('mousedown', preventDefault, {passive: false});
}

const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('service-worker.js');
}

const init = () => {
    
    registerServiceWorker();
    disableTapZoom();
    setBoardSize();

    getPuzzle();
    saveSolution(); 
    saveBoard();
    fillBoard();
    showBoard();

    enableTouch();
    enableNumPad();
    enableKeys();
    enableHints();
    blinkBulb();

    if (aiMode()) setTimeout(showHint, 1500);
}

window.onload = () => document.fonts.ready.then(init);