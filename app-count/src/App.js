import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1); 
  };

  const decrease = () => {
    setCount(count - 1); 
  };

  return (
    <div>
      <p>Число: {count}</p>
      <button onClick={increase}>+1</button>
      <button onClick={decrease}>-1</button>
    </div>
  );
}

export default App;