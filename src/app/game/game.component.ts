import {Component, OnDestroy, OnInit} from '@angular/core';
import * as io from "socket.io-client";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
  socket: any;
  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]
  currentPlayer = ''
  gameOver = false;
  status = 'Waiting for another player...'

  constructor() {
  }

  ngOnInit(): void {
    this.socket = io('http://localhost:3000', {
      transports: ['websocket', 'polling']
    });
    // Set up your socket event listeners here
    this.socket.on('connect', () => {
      console.log('Connected to server');
    });
    this.socket.on('assignPlayer', (player: string) => {
      this.currentPlayer = player;
      this.status = `You are player ${player}. Waiting for the other player...`
    })
    this.socket.on('updateGameState', (gameState: string[][]) => {
      this.board = gameState;
    })
    this.socket.on('gameOver', (message: string) => {
      this.status = message;
      this.gameOver = true;
    })
    this.socket.on('gameFull', () => {
      this.status = 'The game is full. Please try again later.'
    })
    this.socket.on('gameReset', () => {
      this.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ];
      this.gameOver = false;
      this.status = 'Game reset. Waiting for another player...'
    })
  }

  makeMove(row: number, col: number): void {
    if (!this.gameOver && this.board[row][col] === '') {
      this.socket.emit('makeMove', row, col)
    }
  }

  resetGame() {
    this.socket.emit('resetGame');
  }

  ngOnDestroy() {
    if(this.socket) {
      this.socket.disconnect()
    }
  }
}
