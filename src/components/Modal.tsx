import React from 'react';

interface Iprops {
  message: string;
  handleClick: () => void;
}

function Modal({ message, handleClick }: Iprops): JSX.Element {
  return (
    <div>
      <h4>{message}</h4>
      <button onClick={handleClick}>OK!</button>
    </div>
  );
}

export default Modal;
