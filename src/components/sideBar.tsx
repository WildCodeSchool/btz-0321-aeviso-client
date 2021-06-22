import React, { Dispatch, SetStateAction } from 'react';
import Home from '../../media/icons/Home.svg';
import Client from '../../media/icons/Client.svg';
import Rapport from '../../media/icons/folder.svg';
import Réglages from '../../media/icons/Settings.svg';
import useWindowDimensions from '../Hook/useWindowDimension';
import Cross from '../../media/icons/Cross.svg';
import { Link } from 'react-router-dom';

interface sideBarProps {
  sideBarClass: string;
  setIsSidebarVisible: Dispatch<SetStateAction<boolean>>;
}

function SideBar({ sideBarClass, setIsSidebarVisible }: sideBarProps): JSX.Element {
  const { width } = useWindowDimensions();
  const handleClose = () => {
    setIsSidebarVisible(false);
  };
  return (
    <div className={sideBarClass}>
      <div className="py-8 px-8 ">
        <div className="flex justify-between">
          {width < 1200 ? (
            <button className="focus:outline-none" onClick={handleClose}>
              <img className="h-5 w-5" src={Cross} alt="CloseButton" />{' '}
            </button>
          ) : (
            ''
          )}
        </div>

        <nav className="list-none pt-5">
          <Link to="/">
            <li className="flex text-lg  items-center pl-5 h-14 rounded-xl">
              <img src={Home} className="mr-3 mb-1" alt="homesvg" />
              Accueil
            </li>
          </Link>
          <li className="flex text-lg pl-5 mt-5 items-center h-14 ">
            <img src={Client} className="mr-3  mb-1" alt="homesvg" />
            Clients
          </li>
          <Link to="/export">
            <li className="flex text-lg  pl-5 mt-5 items-center h-14">
              <img src={Rapport} className="mr-3 mb-1" alt="homesvg" />
              Rapport
            </li>
          </Link>
          <li className="flex  text-lg  pl-5 mt-5 items-center h-14">
            <img src={Réglages} className="mr-3 mb-1" alt="homesvg" />
            Réglages
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
