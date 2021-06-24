import React from 'react';
import { Link } from 'react-router-dom';
import Client from '../../../media/icons/Client.svg';

function NavSuperAdmin({ handleClose, Home, Rapport, Réglages }: INavAdmin): JSX.Element {
  return (
    <div>
      {' '}
      <nav className="list-none pt-5">
        <Link to="/">
          <li className="flex text-lg  items-center pl-5 h-14 rounded-xl">
            <img src={Home} className="mr-3 mb-1" alt="homesvg" />
            <button className="focus:outline-none" onClick={handleClose}>
              Accueil
            </button>
          </li>
        </Link>
        <li className="flex text-lg pl-5 mt-5 items-center h-14 ">
          <img src={Client} className="mr-3  mb-1" alt="homesvg" />
          <button className="focus:outline-none" onClick={handleClose}>
            Clients
          </button>
        </li>
        <Link to="/export">
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
  );
}

export default NavSuperAdmin;
