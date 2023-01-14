let singles = [];

const rowsHints = (board) => {

    for (let row = 0; row < 9; row++) {
        outer: for (let val = 1; val <= 9; val++) {

            let r, c;

            for (let col = 0; col < 9; col++) {

                if (board[row][col] != 0 || !valid(board, row, col, val)) continue;

                if (r != undefined) continue outer;

                [r, c] = [row, col];
            }

            if (r != undefined) {
                // console.log([r, c, val, 1]);
                singles.push([r, c, val, 1])
            }
        }
    }

    return [null, null, null, null];
}

const colsHints = (board) => {

    for (let col = 0; col < 9; col++) {
        outer: for (let val = 1; val <= 9; val++) {

            let r, c;

            for (let row = 0; row < 9; row++) {

                if (board[row][col] != 0 || !valid(board, row, col, val)) continue;

                if (r != undefined) continue outer;

                [r, c] = [row, col];
            }

            if (r != undefined) {
                // console.log([r, c, val, 2]);
                singles.push([r, c, val, 2])
            }
        }
    }

    return [null, null, null, null];
}

const boxesHints = (board) => {

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

            if (r != undefined) {
                // console.log([r, c, val, 3]);
                singles.push([r, c, val, 3])
            }
        }
    }

    return [null, null, null, null];
}

const rowClues = (board, row, col, val) => {

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

const colClues = (board, row, col, val) => {

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


const boxClues = (board, row, col, val) => {

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

const permuteArrays = (arrays) => {

    if (arrays.length == 0) return [[]];
  
      let result = [];

      arrays[0].forEach(el =>  {

        let rest = permuteArrays(arrays.slice(1));

        rest.forEach(permutation => result.push([...new Set([el].concat(permutation))]));
      });

      return result.sort((a, b) => a - b);
  }

const minArray = (arrays) => arrays.reduce((prev, next) => prev.length > next.length ? next : prev);

    // let minSize = Infinity;
    // let minArray;

    // for (let array of arrays) {
    //   if (array.length < minSize) [minSize, minArray] = [array.length, array];
    // }

    // return minArray;
// }

const hints = (board) => {

    singles = [];

    boxesHints(board);
    colsHints(board);
    rowsHints(board);

    // console.log(singles);

    singles.forEach(single => {
        let [row, col, val, num] = single;

        let clues;

        switch(num) {

            case 1:
                clues = rowClues(board, row, col, val);
                break;
            case 2:
                clues = colClues(board, row, col, val);
                break;
            case 3:
                clues = boxClues(board, row, col, val);
                break;
        }

        clues = minArray(permuteArrays(clues));

        single.push(clues);

    });

    console.log(singles);

    let single = singles.reduce((prev, next) => prev[4].length > next[4].length ? next : prev);

    console.log(single);

    return single;
}

  
