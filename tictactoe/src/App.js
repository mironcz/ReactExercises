import React, { useState, useEffect } from 'react';
import './App.css';

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const isDraw = squares.every(Boolean) && !winner;

  const handleClick = (index) => {
    if (squares[index] || winner || !xIsNext) return; 

    const nextSquares = squares.slice();
    nextSquares[index] = 'X';
    setSquares(nextSquares);
    setXIsNext(false);
  };

  useEffect(() => {
    if (!xIsNext && !winner && !isDraw) {
      const botMove = getBotMove(squares);
      if (botMove !== null) {
        const nextSquares = squares.slice();
        nextSquares[botMove] = 'O';
        setTimeout(() => {
          setSquares(nextSquares);
          setXIsNext(true);
        }, 500);
      }
    }
  }, [xIsNext, squares, winner, isDraw]);

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = 'Draw!';
  } else {
    status = `Next: ${xIsNext ? 'X (You)' : 'O (Bot)'}`;
  }

  return (
    <div className="game">
      <h1>TicTacToe</h1>
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((val, idx) => (
          <Square key={idx} value={val} onClick={() => handleClick(idx)} />
        ))}
      </div>
      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

function calculateWinner(sq) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],           
  ];

  for (let [a, b, c] of lines) {
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
      return sq[a];
    }
  }
  return null;
}

function getBotMove(squares) {
  const emptyIndices = squares
    .map((val, idx) => (val === null ? idx : null))
    .filter((val) => val !== null);
  
  if (emptyIndices.length === 0) return null;
  return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
}

export default App;