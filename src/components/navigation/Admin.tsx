import React from 'react';
import Collaborateurs from '../../../media/icons/Collaborateurs.svg';
import { Link } from 'react-router-dom';

interface ISPNavbar {
  handleClose: () => void;
  Home: string;
  report: string;
  settings: string;
  newReport: string;
}

function Admin({ Home, report, settings, newReport, handleClose }: ISPNavbar): JSX.Element {
  return (
    <div>
      <nav className="list-none pt-5">
        <Link to="/aeviso">
          <li className="flex text-lg  items-center pl-5 h-14 rounded-xl">
            <img
              src={Home}
              className="mr-3 mb-1 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full"
              alt="homesvg"
            />
            <button className="focus:outline-none" onClick={handleClose}>
              Accueil
            </button>
          </li>
        </Link>
        <Link to="/nouveaurapport">
          <li className="flex text-lg  pl-5 mt-5 items-center h-14">
            <img
              src={newReport}
              className="mr-3 mb-1 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full"
              alt="homesvg"
            />
            <button className="focus:outline-none" onClick={handleClose}>
              Nouveau Rapport
            </button>
          </li>
        </Link>
        <Link to="/records/export">
          <li className="flex text-lg  pl-5 mt-5 items-center h-14">
            <img
              src={report}
              className="mr-3 mb-1 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full"
              alt="homesvg"
            />
            <button className="focus:outline-none" onClick={handleClose}>
              Rapport
            </button>
          </li>
        </Link>
        <li className="flex  text-lg  pl-5 mt-5 items-center h-14">
          <img
            src={Collaborateurs}
            className="mr-3 mb-1 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full"
            alt="homesvg"
          />
          <button className="focus:outline-none" onClick={handleClose}>
            Collaborateurs
          </button>
        </li>
        <li className="flex  text-lg  pl-5 mt-5 items-center h-14">
          <img
            src={settings}
            className="mr-3 mb-1 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full"
            alt="homesvg"
          />
          <button className="focus:outline-none" onClick={handleClose}>
            Réglages
          </button>
        </li>
      </nav>
    </div>
  );
}

export default Admin;
