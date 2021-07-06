import React, { useState } from 'react';

// interface IToggle {
//  handleDarkMode: () => void;
//   toggleClass: string;
// }

function ToggleButton(): JSX.Element {
  const [toggleClass, setToggleClass] = useState('bg-component focus:outline-none h-7 mr-2 rounded-full w-7');

  const handleDarkMode = () => {
    if (isDarkMode) {
      setIsDarkMode(false);
      setToggleClass('bg-component focus:outline-none mr-4 h-7 rounded-full w-7');
    } else {
      setIsDarkMode(true);
      setToggleClass('bg-white focus:outline-none h-6 ml-6 rounded-full w-6');
    }
  };
  return (
    <div className="bg-black flex items-center dark:bg-white h-8 w-14 shadow-buttonShadow rounded-full mt-2 px-1">
      <button onClick={handleDarkMode} className={toggleClass}></button>
    </div>
  );
}

export default ToggleButton;
