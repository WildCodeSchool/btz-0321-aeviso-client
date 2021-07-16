import React, { useState } from 'react';
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
  const [isActive, setIsactive] = useState<string>('acceuil');
  return (
    <div>
      <nav className="list-none pt-5">
        <li
          className={`flex text-base mt-2 pl-2 items-center h-12 rounded-lg ${
            isActive === 'accueil'
              ? 'bg-whiteGray dark:bg-mainBg dark:to-customGray shadow-buttonShadow transform scale-110'
              : 'dark:hover:bg-mainBg hover:bg-whiteGray hover:shadow-buttonShadow  transform hover:scale-110'
          } `}
        >
          <img
            src={Home}
            className="mr-3 mb-1 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full"
            alt="homesvg"
          />
          <button
            className="focus:outline-none"
            onClick={() => {
              handleClickLink('/aeviso');
              setIsactive('accueil');
            }}
          >
            Accueil
          </button>
        </li>
        <li
          className={`flex text-base mt-5 pl-2 items-center h-12 rounded-lg ${
            isActive === 'Nouveau Rapport'
              ? 'bg-whiteGray dark:bg-mainBg dark:to-customGray shadow-buttonShadow transform scale-110'
              : 'dark:hover:bg-mainBg hover:bg-whiteGray hover:shadow-buttonShadow  transform hover:scale-110'
          } `}
        >
          <img
            src={newReport}
            className="mr-3 mb-1 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full"
            alt="homesvg"
          />
          <button
            className="focus:outline-none"
            onClick={() => {
              handleClickLink('/rapport/nouveau');
              setIsactive('Nouveau Rapport');
            }}
          >
            Nouveau rapport
          </button>
        </li>
        <li
          className={`flex text-base mt-5 pl-2 items-center h-12 rounded-lg ${
            isActive === 'Exporter un rapport'
              ? 'bg-whiteGray dark:bg-mainBg dark:to-customGray shadow-buttonShadow transform scale-110'
              : 'dark:hover:bg-mainBg hover:bg-whiteGray hover:shadow-buttonShadow  transform hover:scale-110'
          } `}
        >
          <img
            src={report}
            className="mr-3 mb-1 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full"
            alt="homesvg"
          />
          <button
            className="focus:outline-none"
            onClick={() => {
              handleClickLink('/records/export');
              setIsactive('Exporter un rapport');
            }}
          >
            Exporter un rapport
          </button>
        </li>
        <li
          className={`flex text-base mt-5 pl-2 items-center h-12 rounded-lg ${
            isActive === 'Collaborateurs'
              ? 'bg-whiteGray dark:bg-mainBg dark:to-customGray shadow-buttonShadow transform scale-110'
              : 'dark:hover:bg-mainBg hover:bg-whiteGray hover:shadow-buttonShadow  transform hover:scale-110'
          } `}
        >
          <img
            src={Collaborateurs}
            className="mr-3 mb-1 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full"
            alt="homesvg"
          />
          <button
            className="focus:outline-none"
            onClick={() => {
              handleClickLink(`/collaborateurs`);
              setIsactive('Collaborateurs');
            }}
          >
            Collaborateurs
          </button>
        </li>
        <li
          className={`flex text-base mt-5 pl-2 items-center h-12 rounded-lg ${
            isActive === 'projet'
              ? 'bg-whiteGray dark:bg-mainBg dark:to-customGray shadow-buttonShadow transform scale-110'
              : 'dark:hover:bg-mainBg hover:bg-whiteGray hover:shadow-buttonShadow  transform hover:scale-110'
          } `}
        >
          <img
            src={project}
            className="mr-3 mb-1 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full"
            alt="homesvg"
          />
          <button
            className="focus:outline-none"
            onClick={() => {
              handleClickLink(`/projets`);
              setIsactive('projet');
            }}
          >
            Projets
          </button>
        </li>
        <li
          className={`flex text-base mt-5 pl-2 items-center h-12 rounded-lg ${
            isActive === 'settings'
              ? 'bg-whiteGray dark:bg-mainBg dark:to-customGray shadow-buttonShadow transform scale-110'
              : 'dark:hover:bg-mainBg hover:bg-whiteGray hover:shadow-buttonShadow  transform hover:scale-110'
          } `}
        >
          <img
            src={settings}
            className="mr-3 mb-1 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full"
            alt="homesvg"
          />
          <button
            className="focus:outline-none"
            onClick={() => {
              handleClickLink('/reglages');
              setIsactive('settings');
            }}
          >
            Réglages
          </button>
        </li>
      </nav>
    </div>
  );
}

export default Admin;
