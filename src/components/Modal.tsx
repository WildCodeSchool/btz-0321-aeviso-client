import React from "react";
import { useHistory } from "react-router";

interface Iprops {
  message: string;
}

function Modal(message: Iprops): JSX.Element {
  const history = useHistory();

  const handleClick = () => {
    history.push("/users");
  };

  return (
    <div>
      <h4>{message}</h4>
      <button onClick={handleClick}>OK!</button>
    </div>
  );
}

export default Modal;
