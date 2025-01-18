const express = require('express')
const http = require('http')
const socketIo  = require('socket.io')
const cors = require('cors')

const app = express();
app.use(cors())

const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST']
  }
});

let players = {}
let gameState = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];
let currentPlayer = 'X'

io.on('connection', (socket) => {
  console.log('A user connected: ', socket.id)

  // Assign a player (X or O)
  if(Object.keys(players).length < 2) {
    players[socket.id] = currentPlayer;
    socket.emit('assignPlayer', currentPlayer)
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  } else {
    socket.emit('gameFull');
    return;
  }

  // Notify all players about the updated game state
  io.emit('updateGameState', gameState);

  socket.on('makeMove', (row, col) => {
    if(gameState[row][col] === '' && players[socket.id] === currentPlayer) {
      gameState[row][col] = currentPlayer;
      io.emit('updateGameState', gameState)

      if(checkWin(gameState, currentPlayer)) {
        io.emit('gameOver', `${currentPlayer} wins!`);
        resetGame();
      } else if(checkDraw(gameState)) {
        io.emit('gameOver', "It's a draw!")
        resetGame();
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  });

  socket.on('resetGame', () => {
    resetGame();
    io.emit('updateGameState', gameState);
    io.emit('gameReset');
  })

  socket.on('disconnect', () => {
    console.log('User disconnected.', socket.id)
    delete players[socket.id];
    resetGame();
    io.emit('updateGameState', gameState)
  })
})

function checkWin(board, player) {
  for (let i = 0; i < 3; i++) {
    if(
      (board[i][0] === player && board[i][1] === player && board[i][2] === player) ||
      (board[0][i] === player && board[1][i] === player &&  board[2][i] === player)) {
      return true;
    }
  }

  return (board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
    (board[0][2] === player && board[1][1] === player && board[2][0] === player);


}

function checkDraw(board) {
  return board.every(row => row.every(cell => cell !== ''))
}

function resetGame() {
  gameState = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  currentPlayer = 'X';
  players = {}
}

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
