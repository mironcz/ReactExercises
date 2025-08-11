import React, { useState } from 'react';
import Board from './Board';

export default function App() {
  const [gameKey, setGameKey] = useState(0);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Сапёр</h1>
      <Board key={gameKey} rows={10} cols={10} mines={12} />
      <button onClick={() => setGameKey(prev => prev + 1)}>Новая игра</button>
    </div>
  );
}
