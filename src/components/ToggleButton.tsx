import React from 'react';
import { useDarkModeFromStore } from '../store/darkmode.slice';

function ToggleButton(): JSX.Element {
  const { darkMode, dispatchToggleDarkMode } = useDarkModeFromStore();
  const handleDarkMode = () => {
    dispatchToggleDarkMode();
  };

  return (
    <div className="bg-black flex items-center dark:bg-white h-8 w-14 shadow-buttonShadow rounded-full mt-2 px-1">
      <button
        onClick={handleDarkMode}
        className={`focus:outline-none rounded-full w-7 h-7 ${darkMode.active ? 'bg-component ml-5' : 'bg-white mr-5'}`}
      ></button>
    </div>
  );
}

export default ToggleButton;
