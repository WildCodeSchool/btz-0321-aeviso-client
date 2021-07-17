import React from 'react';

type Color = 'red' | 'green';

interface IProps {
  children: React.ReactNode;
  handleClick: () => void;
  color: Color;
}

function Button({ children, handleClick, color }: IProps): JSX.Element {
  const getTheClasses = (color: Color) => {
    if (color === 'red') {
      return 'bg-customRed';
    }
    if (color === 'green') {
      return 'bg-customGreen';
    }
  };

  return (
    <button
      type="button"
      className={`focus:outline-none w-5/12 mt-2 text-white shadow-buttonShadow sm:h-10 md:w-1/4 sm:ml-5 sm:w-4/12 sm:mt-5 sm:rounded-md rounded-md ${getTheClasses(
        color
      )}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default Button;
