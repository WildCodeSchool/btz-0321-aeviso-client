import React from 'react';

interface IToggle {
  handleDarkMode: () => void;
  toggleClass: string;
}

function Togglebutton({ handleDarkMode, toggleClass }: IToggle): JSX.Element {
  return (
    <div className="bg-black flex items-center dark:bg-white h-8 w-14 rounded-xl mt-2 px-2">
      <button onClick={handleDarkMode} className={toggleClass}></button>
    </div>
  );
}

export default Togglebutton;
