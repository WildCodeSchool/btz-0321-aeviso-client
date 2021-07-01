import React from 'react';

interface IToggle {
  handleDarkMode: () => void;
  toggleClass: string;
}

function ToggleButton({ handleDarkMode, toggleClass }: IToggle): JSX.Element {
  return (
    <div className="bg-black flex items-center dark:bg-white h-8 w-14 rounded-full mt-2 px-1">
      <button onClick={handleDarkMode} className={toggleClass}></button>
    </div>
  );
}

export default ToggleButton;
