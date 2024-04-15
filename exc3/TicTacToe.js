let board = []
let userOption = {}
let scorePlayer1 = 0, scorePlayer2 = 0

function setOptions(num) {
    let counter = 0
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            userOption[counter] = [i, j]
            counter++
        }
    }
    return userOption
}

function printBoard(num) {
    let counter = 0
    for (let i = 0; i < num; i++) {
        let row = [];
        for (let j = 0; j < num; j++) {
            row.push((`[${counter+1}]`))
            counter++
        }
        board.push(row);
    }
    return board.join("\n")
}

function isWinForRow(board, boardLen, sign) {
    for (let row = 0; row < boardLen; row++) {
        let win = true
        for (let column = 0; column < boardLen; column++) {
            if (board[row][column] !== sign) {
                win = false
                break
            }
        }
        if (win) {
            return true
        }
    }
    return false
}

function isWinForColumn(board, boardLen, sign) {
    for (let row = 0; row < boardLen; row++) {
        let win = true
        for (let column = 0; column < boardLen; column++) {
            if (board[column][row] !== sign) {
                win = false
                break
            }
        }
        if (win) {
            return true
        }
    }
    return false
}

function isWinForDiagonalLtr(board, boardLen, sign) {
    let win = true
    for (let i = 0; i < boardLen; i++) {
        if (board[i][i] !== sign) {
            win = false
            break
        }
    }

    if (win) {
        return true
    }

    return false
}

function isWinForDiagonalRtl(board, boardLen, sign) {
    let win = true
    for (let j = boardLen - 1, i = 0; j >= 0; j--, i++) {
        if (board[i][j] !== sign) {
            win = false
            break
        }
    }

    if (win) {
        return true
    }

    return false
}

function checkWin(board, boardLen, sign) {
    return isWinForRow(board, boardLen, sign) || isWinForColumn(board, boardLen, sign) || isWinForDiagonalLtr(board, boardLen, sign) || isWinForDiagonalRtl(board, boardLen, sign);
}

function updateBoard(option, sign) {
    let [x, y] = userOption[option - 1]
    board[x][y] = sign
}

function checkMove(option) {
    let coordinates = userOption[option - 1];
    if (!coordinates) {
        console.log("Please choose a location from the board");
        return false;
    }
    let [x, y] = coordinates;
    if (board[x][y] == "[X]" || board[x][y] == '[O]') {
        console.log("You can't move here");
        return false;
    }
    return true;
}

function clearBoard() {
    board = []
}

function updateScore(playerWon) {
    if (playerWon === 1) {
        scorePlayer1 += 1;
    } else if (playerWon === 2) {
        scorePlayer2 += 1;
    }
}

while (true) {
    let gameRunning = true
    while (gameRunning) {
        let num = parseInt(prompt("enter the board size you want to play"))
        console.log(printBoard(num))
        setOptions(num)
        let boardLen = num
        let turn = 0
        while (turn < num * num) {
            if (turn % 2 == 0) {
                while (true) {
                    let choice = parseInt(prompt("enter the number you want to play for X"))
                    if (!checkMove(choice)) {
                        continue
                    } else {
                        updateBoard(choice, '[X]')
                        console.log(printBoard())
                        if (checkWin(board, boardLen, '[X]')) {
                            console.log("X WON")
                            updateScore(1)
                            console.log(`Player 1: ${scorePlayer1} Player 2: ${scorePlayer2}`);
                            turn = num * num
                        }
                    break
                    }
                }
    
            } else if (turn % 2 == 1) {
                while (true) {
                    let choice = parseInt(prompt("enter the number you want to play for O"))
                    if (!checkMove(choice)) {
                        continue
                    } else {
                        updateBoard(choice, '[O]')
                        console.log(printBoard())
                        if (checkWin(board, boardLen, '[O]')) {
                            console.log('O WON')
                            updateScore(2)
                            console.log(`Player 1: ${scorePlayer1} Player 2: ${scorePlayer2}`);
                            turn = num * num
                        }
                    break
                    }
                }
            }
            turn++
        }
        gameRunning = false
    }
    while (true) {
        let continuePlaying = prompt("Do you want to do another game (y/n)?")
        let continuePlayingLower = continuePlaying.toLowerCase()
        if (continuePlayingLower === 'y') {
            clearBoard()
            gameRunning = true
            break
        } else if (continuePlayingLower === 'n') {
            console.log("Thank you for playing Tic Tac Toe!")
            throw new Error("Exiting script");
        } else {
            continue
        }
    }
}



