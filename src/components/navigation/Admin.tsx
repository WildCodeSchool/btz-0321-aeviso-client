import React from 'react';

import Collaborateurs from '../../../media/icons/Collaborateurs.svg';
import project from '../../../media/icons/project.svg';

interface ISPNavbar {
  handleClickLink: (url: string) => void;
  Home: string;
  report: string;
  settings: string;
  newReport: string;
}

function Admin({ Home, report, settings, newReport, handleClickLink }: ISPNavbar): JSX.Element {
  return (
    <div>
      <nav className="list-none pt-5">
        <li className="flex text-sm mt-1 items-center pl-5 h-14 rounded-xl">
          <img
            src={Home}
            className="mr-3 mb-1 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full"
            alt="homesvg"
          />
          <button className="focus:outline-none" onClick={() => handleClickLink('/aeviso')}>
            Accueil
          </button>
        </li>
        <li className="flex text-sm mt-1 pl-5 items-center h-14">
          <img
            src={newReport}
            className="mr-3 mb-1 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full"
            alt="homesvg"
          />
          <button className="focus:outline-none" onClick={() => handleClickLink('/rapport/nouveau')}>
            Nouveau Rapport
          </button>
        </li>
        <li className="flex text-sm mt-1 pl-5 items-center h-14">
          <img
            src={report}
            className="mr-3 mb-1 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full"
            alt="homesvg"
          />
          <button className="focus:outline-none" onClick={() => handleClickLink('/records/export')}>
            Rapport
          </button>
        </li>
        <li className="flex  text-sm mt-1  pl-5  items-center h-14">
          <img
            src={Collaborateurs}
            className="mr-3 mb-1 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full"
            alt="homesvg"
          />
          <button className="focus:outline-none" onClick={() => handleClickLink(`/collaborateurs`)}>
            Collaborateurs
          </button>
        </li>
        <li className="flex  text-sm mt-1  pl-5  items-center h-14">
          <img
            src={project}
            className="mr-3 mb-1 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full"
            alt="homesvg"
          />
          <button className="focus:outline-none" onClick={() => handleClickLink(`/projets`)}>
            Projet
          </button>
        </li>
        <li className="flex  text-sm mt-1  pl-5  items-center h-14">
          <img
            src={settings}
            className="mr-3 mb-1 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full"
            alt="homesvg"
          />
          <button className="focus:outline-none" onClick={() => handleClickLink('/reglages')}>
            Réglages
          </button>
        </li>
      </nav>
    </div>
  );
}

export default Admin;
