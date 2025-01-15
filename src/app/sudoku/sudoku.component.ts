import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css']
})
export class SudokuComponent implements OnInit {
  board: number[][] = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ];

  initialBoard: number[][] = JSON.parse(JSON.stringify(this.board));
  status = '';

  // check if a cell is part of the initial puzzle
  isFixedCell(row: number, col: number) : boolean {
    return this.initialBoard[row][col] !== 0;
  }

  // highlight cells in the same row, column, or 3x3 box
  isHighlighted(row: number, col: number) : boolean {
    return this.board[row][col] !== 0;
  }

  onInput(event: Event, row: number, col: number): void {
    const input = (event.target as HTMLInputElement).value;
    if(!/^[1-9]$/.test(input)) {
      this.board[row][col] = 0;
      (event.target as HTMLInputElement).value = ''
    } else {
      this.board[row][col] = parseInt(input, 10);
    }
  }

  solve(): void {
    if(this.solveSudoku(this.board)) {
      this.status = 'Solved!';
    } else {
      this.status = 'No solution exists!'
    }
  }

  reset() : void {
    this.board = JSON.parse(JSON.stringify(this.initialBoard));
    this.status = '';
  }

  solveSudoku(board: number[][]) : boolean {
    for (let row = 0; row < 9; row++) {
      for(let col= 0; col < 9; col++) {
        if(board[row][col] === 0) {
          for(let num = 1; num <= 9; num++) {
            if(this.isValid(board, row, col, num)) {
              board[row][col] = num;
              if(this.solveSudoku(board)) {
                return true;
              }
              board[row][col] = 0; // backtrack
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  isValid(board: number[][], row: number, col: number, num: number) : boolean {
    for(let i = 0; i < 9; i++) {
      if(board[row][i] === num) return false;
    }

    // check column
    for(let i = 0; i < 9; i++) {
      if(board[i][col] === num) return false;
    }

    // check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        if(board[boxRow + i][boxCol + j] === num) return false;
      }
    }

    return true;
  }

  constructor() { }

  ngOnInit() {
  }

}
