import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('Угадай число от 1 до 100');
  const [attempts, setAttempts] = useState(0);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const handleGuess = () => {
    const numberGuess = parseInt(guess);

    if (isNaN(numberGuess)) {
      setMessage('Введите число!');
      return;
    }

    setAttempts(attempts + 1);

    if (numberGuess === targetNumber) {
      setMessage(`Поздравляем! Вы угадали число за ${attempts + 1} попыток!`);
    } else if (numberGuess < targetNumber) {
      setMessage('Слишком мало!');
    } else {
      setMessage('Слишком много!');
    }
  };

  const resetGame = () => {
    setTargetNumber(generateRandomNumber());
    setGuess('');
    setMessage('Угадай число от 1 до 100');
    setAttempts(0);
  };

  return (
    <div className="App">
      <h1>Угадай число</h1>
      <p>{message}</p>

      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Введите число"
      />

      <button onClick={handleGuess}>Угадать</button>
      <button onClick={resetGame}>Сбросить</button>
    </div>
  );
}

export default App;
