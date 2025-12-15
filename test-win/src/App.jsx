import React, { useState } from 'react';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={openModal} className="main-button">
          Открыть модальное окно
        </button>
      </header>

      {isModalOpen && (
        <Modal onClose={closeModal} />
      )}
    </div>
  );
}

function Modal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>Привет! Это модальное окно.</p>
        <div className="modal-buttons">
          <button onClick={onClose} className="modal-button ok">OK</button>
          <button onClick={onClose} className="modal-button cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default App;