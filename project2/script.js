const board = document.getElementById('board');
const size = 10;
const mines = 10;

let minePositions = [];

function createBoard() {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('data-row', i);
      cell.setAttribute('data-col', j);
      cell.addEventListener('click', handleCellClick);
      board.appendChild(cell);
    }
  }
}

function plantMines() {
  while (minePositions.length < mines) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);
    if (!minePositions.includes(`${row}-${col}`)) {
      minePositions.push(`${row}-${col}`);
    }
  }
}

function handleCellClick(event) {
  const row = parseInt(event.target.getAttribute('data-row'));
  const col = parseInt(event.target.getAttribute('data-col'));
  const cell = event.target;

  if (minePositions.includes(`${row}-${col}`)) {
    cell.classList.add('mine');
    revealMines();
    alert('Game Over!');
  } else {
    const minesAround = countMinesAround(row, col);
    cell.innerText = minesAround;
    cell.classList.add('hidden');
    if (minesAround === 0) {
      revealEmptyCells(row, col);
    }
  }
}

function countMinesAround(row, col) {
  let count = 0;
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (minePositions.includes(`${i}-${j}`)) {
        count++;
      }
    }
  }
  return count;
}

function revealEmptyCells(row, col) {
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      const cell = document.querySelector(`.cell[data-row="${i}"][data-col="${j}"]`);
      if (cell && !cell.classList.contains('hidden')) {
        const minesAround = countMinesAround(i, j);
        cell.innerText = minesAround;
        cell.classList.add('hidden');
        if (minesAround === 0) {
          revealEmptyCells(i, j);
        }
      }
    }
  }
}

function revealMines() {
  minePositions.forEach(pos => {
    const [row, col] = pos.split('-');
    const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    cell.classList.add('mine');
  });
}

createBoard();
plantMines();
