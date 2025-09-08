import React, { useState, useCallback, useRef } from "react";
import './App.css';
// todo: use css in return div && code -> functions - 1. try failed

const numRows = 25;
const numCols = 25;
const timeDelay = 150

const operations = [
  [0, 1], [0, -1],
  [1, 0], [-1, 0],
  [1, 1], [1, -1],
  [-1, 1], [-1, -1],
];

const generateEmptyGrid = () => {
  return Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => 0)
  );
};

export default function App() {
  const [grid, setGrid] = useState(() => generateEmptyGrid());
  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;

    setGrid((g) => {
      return g.map((row, i) =>
        row.map((cell, j) => {
          let neighbors = 0;
          operations.forEach(([x, y]) => {
            const newI = i + x;
            const newJ = j + y;
            if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
              neighbors += g[newI][newJ];
            }
          });

          if (cell === 1 && (neighbors < 2 || neighbors > 3)) {
            return 0;
          }
          if (cell === 0 && neighbors === 3) {
            return 1;
          }
          return cell;
        })
      );
    });

    setTimeout(runSimulation, timeDelay);
  }, []);

    const handleStartPause = () => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  };

  const handleClear = () => {
    setGrid(generateEmptyGrid());
  };

  const handleRandom = () => {
    const rows = Array.from({ length: numRows }, () =>
      Array.from({ length: numCols }, () =>
        Math.random() > 0.7 ? 1 : 0
      )
    );
    setGrid(rows);
  };
// faild to impement
  const handleCellClick = (i, j) => {
    const newGrid = grid.map((row, r) =>
      row.map((cell, c) =>
        r === i && c === j ? (cell ? 0 : 1) : cell
      )
    );
    setGrid(newGrid);
  };

  return (
    <div>
      <button onClick={handleStartPause}>
        {running ? "Пауза" : "Старт"}
      </button>

      <button onClick={handleClear}>
        Очистить
      </button>

      <button onClick={handleRandom}>
        Случайно
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => {
                const newGrid = grid.map((row, r) =>
                  row.map((cell, c) =>
                    r === i && c === j ? (cell ? 0 : 1) : cell
                  )
                );
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][j] ? "black" : "white",
                border: "solid 1px gray",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
