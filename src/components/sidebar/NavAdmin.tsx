import React from 'react';
import { Link } from 'react-router-dom';

function NavAdmin({ handleClose, Home, Rapport, Réglages }: INavAdmin): JSX.Element {
  return (
    <div>
      <Link to="/">
        <li className="flex text-lg  items-center pl-5 h-14 rounded-xl">
          <img src={Home} className="mr-3 mb-1" alt="homesvg" />
          <button className="focus:outline-none" onClick={handleClose}>
            Accueil
          </button>
        </li>
      </Link>
      <li className="flex  text-lg  pl-5 mt-5 items-center h-14">
        <img src={Réglages} className="mr-3 mb-1" alt="homesvg" />
        <button className="focus:outline-none" onClick={handleClose}>
          Nouveau Rapport
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
          Projets
        </button>
      </li>
      <li className="flex  text-lg  pl-5 mt-5 items-center h-14">
        <img src={Réglages} className="mr-3 mb-1" alt="homesvg" />
        <button className="focus:outline-none" onClick={handleClose}>
          Collaborateurs
        </button>
      </li>
      <li className="flex  text-lg  pl-5 mt-5 items-center h-14">
        <img src={Réglages} className="mr-3 mb-1" alt="homesvg" />
        <button className="focus:outline-none" onClick={handleClose}>
          Réglages
        </button>
      </li>
    </div>
  );
}

export default NavAdmin;
