import React from 'react';
import Projets from '../../../media/icons/Projets.svg';
import Collaborateurs from '../../../media/icons/Collaborateurs.svg';
interface ISPNavbar {
  handleClose: () => void;
  Home: string;
  Rapport: string;
  Réglages: string;
  NouveauRapport: string;
}

function ADMIN({ Home, Rapport, Réglages, NouveauRapport, handleClose }: ISPNavbar): JSX.Element {
  return (
    <div>
      <nav className="list-none pt-5">
        <li className="flex text-lg  items-center pl-5 h-14 rounded-xl">
          <img src={Home} className="mr-3 mb-1" alt="homesvg" />
          <button className="focus:outline-none" onClick={handleClose}>
            Accueil
          </button>
        </li>
        <li className="flex text-lg  pl-5 mt-5 items-center h-14">
          <img src={NouveauRapport} className="mr-3 mb-1" alt="homesvg" />
          <button className="focus:outline-none" onClick={handleClose}>
            Nouveau Rapport
          </button>
        </li>
        <li className="flex text-lg  pl-5 mt-5 items-center h-14">
          <img src={Rapport} className="mr-3 mb-1" alt="homesvg" />
          <button className="focus:outline-none" onClick={handleClose}>
            Rapport
          </button>
        </li>
        <li className="flex text-lg  pl-5 mt-5 items-center h-14">
          <img src={Projets} className="mr-3 mb-1" alt="homesvg" />
          <button className="focus:outline-none" onClick={handleClose}>
            Projets
          </button>
        </li>
        <li className="flex  text-lg  pl-5 mt-5 items-center h-14">
          <img src={Collaborateurs} className="mr-3 mb-1" alt="homesvg" />
          <button className="focus:outline-none" onClick={handleClose}>
            Réglages
          </button>
        </li>
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

export default ADMIN;
