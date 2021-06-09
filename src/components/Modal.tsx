import React, { Dispatch, SetStateAction } from 'react';
import { useHistory } from 'react-router';

interface Iprops {
  message: string;
  handleClick: () => void;
}

function Modal({ message, handleClick }: Iprops): JSX.Element {
  const history = useHistory();

  return (
    <div>
      <h4>{message}</h4>
      <button onClick={handleClick}>OK!</button>
    </div>
  );
}

export default Modal;
