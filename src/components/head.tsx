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
    setSideBarClass('flex flex-col bg-black w-full fixed  h-screen text-white font-roboto justify-between');
  };
  return (
    <div className="flex justify-between w-full items-start">
      <div className="sm:flex w-full justify-between items-end">
        <div className="flex-col pl-2">
          <h1 className="text-5xl font-bold">aeviso</h1>
          <h2 className="text-xs">Expert Comptable.audit.conseil</h2>
        </div>
        <h2 className="text-lg">{today()}</h2>
      </div>
      <button onClick={handleSidebar} className="mt-3 sm:hidden">
        <img className="h-10  w-10" src={Burger} alt="" />
      </button>
    </div>
  );
}

export default Head;
