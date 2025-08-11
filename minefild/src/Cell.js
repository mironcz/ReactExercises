import React from 'react';

export default function Cell({ data, onClick, onRightClick }) {
  const style = {
    width: 30,
    height: 30,
    border: '1px solid #999',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    background: data.isOpen ? '#ddd' : '#bbb',
    cursor: 'pointer',
    userSelect: 'none',
  };

  let text = '';
  if (data.isOpen) {
    if (data.isMine) text = '💣';
    else if (data.adjacentMines > 0) text = data.adjacentMines;
  } else if (data.isFlagged) {
    text = '🚩';
  }

  return (
    <div style={style} onClick={onClick} onContextMenu={onRightClick}>
      {text}
    </div>
  );
}