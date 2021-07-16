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
      className={`focus:outline-none text-white shadow-buttonShadow mt-5 sm:mt-7 w-5/12 md:w-1/4 sm:ml-5 sm:w-4/12 py-2 sm:h-10 sm:rounded-md rounded-lg ${getTheClasses(
        color
      )}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default Button;
