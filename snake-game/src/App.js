import React, { useState, useEffect } from "react";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 8, y: 8 }];
const INITIAL_DIRECTION = "RIGHT";

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(randomFood());
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "w" && direction !== "DOWN") setDirection("UP");
      if (e.key === "s" && direction !== "UP") setDirection("DOWN");
      if (e.key === "a" && direction !== "RIGHT") setDirection("LEFT");
      if (e.key === "d" && direction !== "LEFT") setDirection("RIGHT");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(moveSnake, 150);
    return () => clearInterval(interval);
  });

  function moveSnake() {
    const head = { ...snake[0] };
    if (direction === "UP") head.y -= 1;
    if (direction === "DOWN") head.y += 1;
    if (direction === "LEFT") head.x -= 1;
    if (direction === "RIGHT") head.x += 1;

    if (head.x < 0 || head.y < 0 || head.x >= GRID_SIZE || head.y >= GRID_SIZE) {
      setGameOver(true);
      return;
    }

    if (snake.some(seg => seg.x === head.x && seg.y === head.y)) {
      setGameOver(true);
      return;
    }

    const newSnake = [head, ...snake];

    if (head.x === food.x && head.y === food.y) {
      setFood(randomFood());
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }

  function randomFood() {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  }

  return (
    <div>
      <h1>Змейка</h1>
      {gameOver && <h2>Игра окончена!</h2>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_SIZE}, 20px)`,
          border: "2px solid black",
          background: "#eee",
          width: GRID_SIZE * 20,
          height: GRID_SIZE * 20,
        }}
      >
        {[...Array(GRID_SIZE * GRID_SIZE)].map((_, index) => {
          const x = index % GRID_SIZE;
          const y = Math.floor(index / GRID_SIZE);
          const isSnake = snake.some(seg => seg.x === x && seg.y === y);
          const isFood = food.x === x && food.y === y;
          return (
            <div
              key={index}
              style={{
                width: 20,
                height: 20,
                background: isSnake ? "blue" : isFood ? "red" : "",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}