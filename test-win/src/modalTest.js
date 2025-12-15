import React from "react";

import { useState } from "react";

function ModalTest({ children, onSave, onClose }) {
 
  return (
    <div>
      <div>
        <p>
          Edit author
        </p>
        <button onClick={onSave}>Записать</button>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
}

export default ModalTest;