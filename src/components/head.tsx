import React, { Dispatch, SetStateAction } from 'react';
import Burger from '../../media/icons/burger.svg';
import { today } from '../assets/date';

interface IProps {
  setIsSidebarVisible: Dispatch<SetStateAction<boolean>>;
  setSideBarClass: Dispatch<SetStateAction<string>>;
}

function Head({ setIsSidebarVisible, setSideBarClass }: IProps): JSX.Element {
  const handleSidebar = () => {
    setIsSidebarVisible(true);
    setSideBarClass(
      'flex flex-col bg-white border-2 dark:border-componentBorder dark:bg-component w-screen fixed  h-screen  text-dark dark:text-white font-roboto justify-between visible sm:visible'
    );
  };
  return (
    <div className="flex justify-between w-full h-full items-start sm:items-end px-2 py-1">
      <div className="flex sm:flex-row-reverse flex-col w-10/12 justify-between h-full ">
        <div className="flex-col h-full sm:hidden sm:items-end">
          <h1 className="text-4xl  font-bold">aeviso</h1>
          <h2 className="text-sm">Expert Comptable.audit.conseil</h2>
        </div>
        <h2 className="text-xs sm:text-lg">{today()}</h2>
      </div>
      <button onClick={handleSidebar} className="mt-3 sm:hidden focus:outline-none">
        <img className="bg-component rounded-lg shadow-buttonShadow px-2 h-12  w-12" src={Burger} alt="" />
      </button>
    </div>
  );
}

export default Head;
