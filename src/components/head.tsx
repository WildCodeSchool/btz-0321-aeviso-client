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
    setSideBarClass('flex flex-col bg-black w-screen fixed  h-screen text-white font-roboto justify-between');
  };
  return (
    <div className="flex justify-between w-full h-full items-start px-2">
      <div className="flex sm:flex-row flex-col w-full justify-between h-full sm:items-end">
        <div className="flex-col h-full">
          <h1 className="sm:text-4xl text-5xl  font-bold">aeviso</h1>
          <h2 className="text-sm">Expert Comptable.audit.conseil</h2>
        </div>
        <h2 className="text-base sm:text-lg">{today()}</h2>
      </div>
      <button onClick={handleSidebar} className="mt-3 sm:hidden focus:outline-none">
        <img className="h-10  w-10" src={Burger} alt="" />
      </button>
    </div>
  );
}

export default Head;
