import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {
  board: string[][] = [
    ['','','',],
    ['','','',],
    ['','','',],
  ];

  currentPlayer = 'X';
  gameOver = false;
  status = `Player ${this.currentPlayer}'s turn`;

  makeMove(row: number, col: number) {
    if(!this.gameOver && this.board[row][col] === '') {
      this.board[row][col] = this.currentPlayer;
      if(this.checkWin(row,col)) {
        this.status = `Player ${this.currentPlayer} wins!`;
        this.gameOver = true;
      } else if(this.checkDraw()) {
        this.status = "It's a draw!";
        this.gameOver = true;
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.status = `Player ${this.currentPlayer}'s turn.`;
      }
    }
  }

  checkWin(row: number, col: number) : boolean {
    if(
      this.board[row][0] === this.currentPlayer &&
      this.board[row][1] === this.currentPlayer &&
      this.board[row][2] === this.currentPlayer
    ) {
      return true;
    }

    if(
      this.board[0][col] === this.currentPlayer &&
      this.board[1][col] === this.currentPlayer &&
      this.board[2][col] === this.currentPlayer
    ) {
      return true
    }

    return (row === col &&
        this.board[0][0] === this.currentPlayer &&
        this.board[1][1] === this.currentPlayer &&
        this.board[2][1] === this.currentPlayer) ||
      (row + col === 2 &&
        this.board[0][2] === this.currentPlayer &&
        this.board[1][1] === this.currentPlayer &&
        this.board[2][0] === this.currentPlayer);

  }

  resetGame(): void {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.currentPlayer = 'X';
    this.gameOver = false;
    this.status = `Player ${this.currentPlayer}'s turn.`
  }

  checkDraw() : boolean {
    return this.board.every(row => row.every(cell => cell !== ''))
  }

  constructor() { }

  ngOnInit() {
  }

}
