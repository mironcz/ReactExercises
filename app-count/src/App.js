import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const incrise = () => {
    setCount(count + 1); 
  };
  const decrese = () => {
    setCount(count - 1); 
  };


  return (
    <div>
      <p>Число: {count}</p>
      <button onClick={incrise}>+1</button>
      <button onClick={decrese}>-1</button>
    </div>
  );
}

export default App;