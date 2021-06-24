import React, { Dispatch, SetStateAction } from 'react';
import Home from '../../media/icons/Home.svg';
import Client from '../../media/icons/Client.svg';
import Rapport from '../../media/icons/folder.svg';
import Réglages from '../../media/icons/Settings.svg';
import Cross from '../../media/icons/Cross.svg';
import { Link } from 'react-router-dom';

interface sideBarProps {
  sideBarClass: string;
  setIsSidebarVisible: Dispatch<SetStateAction<boolean>>;
  setSideBarClass: Dispatch<SetStateAction<string>>;
}

function SideBar({ sideBarClass, setSideBarClass }: sideBarProps): JSX.Element {
  const handleClose = () => {
    setSideBarClass(
      'flex flex-col bg-black  h-full shadow-mainShadow  rounded-xl text-white font-roboto justify-between invisible sm:visible'
    );
  };

  return (
    <div className={sideBarClass}>
      <div className="py-8 px-8 ">
        <div className="flex justify-between">
          <div className="flex justify-between w-full sm:hidden">
            <div className="flex-col h-full">
              <h1 className="sm:text-5xl text-5xl  font-bold">aeviso</h1>
              <h2 className="text-sm">Expert Comptable.audit.conseil</h2>
            </div>
            <button className="focus:outline-none" onClick={handleClose}>
              <img className="h-5 w-5" src={Cross} alt="CloseButton" />{' '}
            </button>
          </div>
        </div>

        <nav className="list-none pt-5">
          <Link to="/">
            <li className="flex text-lg  items-center pl-5 h-14 rounded-xl">
              <img src={Home} className="mr-3 mb-1" alt="homesvg" />
              <button className="focus:outline-none" onClick={handleClose}>
                Accueil
              </button>
            </li>
          </Link>
          <Link to="/clients">
            <li className="flex text-lg pl-5 mt-5 items-center h-14 ">
              <img src={Client} className="mr-3  mb-1" alt="homesvg" />
              <button className="focus:outline-none" onClick={handleClose}>
                Clients
              </button>
            </li>
          </Link>
          <Link to="/records/export">
            <li className="flex text-lg  pl-5 mt-5 items-center h-14">
              <img src={Rapport} className="mr-3 mb-1" alt="homesvg" />
              <button className="focus:outline-none" onClick={handleClose}>
                Rapport
              </button>
            </li>
          </Link>
          <li className="flex  text-lg  pl-5 mt-5 items-center h-14">
            <img src={Réglages} className="mr-3 mb-1" alt="homesvg" />
            <button className="focus:outline-none" onClick={handleClose}>
              Réglages
            </button>
          </li>
        </nav>
      </div>

      <div className="h-20  border-t border-white  p-6">
        <h2 className="text-xl font-bold">Maxime Savoie</h2>
      </div>
    </div>
  );
}

export default SideBar;
