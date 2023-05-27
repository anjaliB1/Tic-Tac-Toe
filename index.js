const x = 'x'
const o = 'o'
const winningConditions = [ [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellBoxes = document.querySelectorAll('[data-cell]')
const game = document.getElementById('game')
const winner = document.getElementById('winner')
const restartButton = document.getElementById('restartButton')
const winnerText = document.querySelector('[data-winner-text]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  cellBoxes.forEach(cell => {
    cell.classList.remove(x)
    cell.classList.remove(o)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winner.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? o : x
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    winnerText.innerText = 'Its a Draw!'
  } else {
    winnerText.innerText = `${circleTurn ? "O" : "X"} Wins!`
  }
  winner.classList.add('show')
}

function isDraw() {
  return [...cellBoxes].every(cell => {
    return cell.classList.contains(x) || cell.classList.contains(o)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  game.classList.remove(x)
  game.classList.remove(o)
  if (circleTurn) {
    game.classList.add(o)
  } else {
    game.classList.add(x)
  }
}

function checkWin(currentClass) {
  return winningConditions.some(combination => {
    return combination.every(index => {
      return cellBoxes[index].classList.contains(currentClass)
    })
  })
}