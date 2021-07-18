import React from 'react';

type Color = 'red' | 'green' | 'grey';

interface IProps {
  children: React.ReactNode;
  handleClick: () => void;
  color: Color;
  isDisabled?: boolean;
}

const getTheColor = (color: Color) => {
  switch (color) {
    case 'red':
      return 'bg-customRed';
    case 'green':
      return 'bg-customGreen';
    case 'grey':
      return 'bg-custumGray border border-gray-900 text-gray-400';
    default:
      return '';
  }
};

function Button({ children, handleClick, color, isDisabled }: IProps): JSX.Element {
  return (
    <button
      type="button"
      className={`focus:outline-none w-5/12 mt-2 text-white shadow-buttonShadow sm:h-10 md:w-1/4 sm:ml-5 sm:w-4/12 sm:mt-5 sm:rounded-md rounded-md ${getTheColor(
        color
      )}`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}

export default Button;
