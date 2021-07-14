import React from 'react';
import projet from '../../../media/icons/project.svg';
interface ISPNavbar {
  handleClickLink: (url: string) => void;
  Home: string;
  report: string;
  settings: string;
  newReport: string;
}

function User({ newReport, Home, settings, report, handleClickLink }: ISPNavbar): JSX.Element {
  return (
    <div>
      <nav className="list-none pt-5">
        <li className="flex text-lg  items-center pl-5 h-14 rounded-xl">
          <img
            src={Home}
            className="mr-3 mb-1 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full"
            alt="homesvg"
          />
          <button className="focus:outline-none" onClick={() => handleClickLink('/aeviso')}>
            Accueil
          </button>
        </li>

        <li className="flex text-lg  pl-5 mt-5 items-center h-14">
          <img
            src={newReport}
            className="mr-3 mb-1 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full"
            alt="homesvg"
          />
          <button className="focus:outline-none" onClick={() => handleClickLink('/rapport/nouveau')}>
            Nouveau Rapport
          </button>
        </li>

        <li className="flex text-lg  pl-5 mt-5 items-center h-14">
          <img
            src={report}
            className="mr-3 mb-1 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full"
            alt="homesvg"
          />
          <button className="focus:outline-none" onClick={() => handleClickLink('')}>
            Mes rapports
          </button>
        </li>

        <li className="flex text-lg  pl-5 mt-5 items-center h-14">
          <img
            src={projet}
            className="mr-3 mb-1 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full"
            alt="homesvg"
          />
          <button className="focus:outline-none" onClick={() => handleClickLink('/mesprojets')}>
            Projets
          </button>
        </li>

        <li className="flex  text-lg  pl-5 mt-5 items-center h-14">
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

export default User;
