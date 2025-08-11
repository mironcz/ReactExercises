import React, { useState, useEffect } from 'react';
import Cell from './Cell';

function generateBoard(rows, cols, mines) {
  const board = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false,
      isOpen: false,
      isFlagged: false,
      adjacentMines: 0,
    }))
  );

  let placedMines = 0;
  while (placedMines < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (!board[r][c].isMine) {
      board[r][c].isMine = true;
      placedMines++;
    }
  }

  const directions = [-1, 0, 1];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].isMine) continue;
      let count = 0;
      for (let dr of directions) {
        for (let dc of directions) {
          const nr = r + dr;
          const nc = c + dc;
          if (
            nr >= 0 &&
            nr < rows &&
            nc >= 0 &&
            nc < cols &&
            board[nr][nc].isMine
          ) {
            count++;
          }
        }
      }
      board[r][c].adjacentMines = count;
    }
  }

  return board;
}

export default function Board({ rows, cols, mines }) {
  const [board, setBoard] = useState(() => generateBoard(rows, cols, mines));
  const [gameOver, setGameOver] = useState(false);

  function openCell(r, c) {
    if (gameOver || board[r][c].isOpen || board[r][c].isFlagged) return;

    const newBoard = board.map(row => row.map(cell => ({ ...cell })));

    function dfs(x, y) {
      const cell = newBoard[x][y];
      if (cell.isOpen || cell.isFlagged) return;
      cell.isOpen = true;

      if (cell.adjacentMines === 0 && !cell.isMine) {
        for (let dr of [-1, 0, 1]) {
          for (let dc of [-1, 0, 1]) {
            const nx = x + dr;
            const ny = y + dc;
            if (
              nx >= 0 &&
              nx < rows &&
              ny >= 0 &&
              ny < cols &&
              !(dr === 0 && dc === 0)
            ) {
              dfs(nx, ny);
            }
          }
        }
      }
    }

    if (newBoard[r][c].isMine) {
      alert('💥 Игра окончена!');
      setGameOver(true);
      newBoard[r][c].isOpen = true;
    } else {
      dfs(r, c);
    }

    setBoard(newBoard);
  }

  function toggleFlag(r, c, e) {
    e.preventDefault();
    if (gameOver || board[r][c].isOpen) return;
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    newBoard[r][c].isFlagged = !newBoard[r][c].isFlagged;
    setBoard(newBoard);
  }

  return (
    <div style={{ display: 'inline-block' }}>
      {board.map((row, r) => (
        <div key={r} style={{ display: 'flex' }}>
          {row.map((cell, c) => (
            <Cell
              key={`${r}-${c}`}
              data={cell}
              onClick={() => openCell(r, c)}
              onRightClick={(e) => toggleFlag(r, c, e)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
