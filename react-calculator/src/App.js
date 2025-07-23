import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");

  const handleBtnClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleCalculate = () => {
    try {
      setInput(eval(input).toString());
    } catch (error) {
      setInput("Error");
    }
  };

  return (
    <div className="calculator">
      <h1>Калькулятор</h1>
      <input type="text" value={input} readOnly />
      <div className="buttons">
        {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"].map((btn) => (
          <button
            key={btn}
            onClick={
              btn === "="
                ? handleCalculate
                : () => handleBtnClick(btn)
            }
          >
            {btn}
          </button>
        ))}
        <button onClick={handleClear}>C</button>
      </div>
    </div>
  );
}

export default App;