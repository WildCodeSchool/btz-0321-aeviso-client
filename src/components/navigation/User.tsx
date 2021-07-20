import React, { useState } from 'react';
import projet from '../../../media/icons/project.svg';

interface ISPNavbar {
  handleClickLink: (url: string) => void;
  Home: string;
  report: string;
  settings: string;
  newReport: string;
}

function User({ newReport, Home, settings, report, handleClickLink }: ISPNavbar): JSX.Element {
  const [isActive, setIsactive] = useState<string>('');
  return (
    <div>
      <nav className="list-none pt-5">
        <li
          className={`flex text-base mt-2 pl-2 items-center h-12 rounded-lg ${
            isActive === 'acceuil'
              ? 'bg-white dark:bg-input dark:to-customGray shadow-buttonShadow transform scale-110'
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
              handleClickLink('/');
              setIsactive('accueil');
            }}
          >
            Accueil
          </button>
        </li>

        <li
          className={`flex text-base mt-5 pl-2 items-center h-12 rounded-lg ${
            isActive === 'nouveau rapport'
              ? 'bg-white dark:bg-input dark:to-customGray shadow-buttonShadow transform scale-110'
              : 'dark:hover:bg-mainBg hover:bg-whiteGray  hover:shadow-buttonShadow  transform hover:scale-110'
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
              handleClickLink('/saisie');
              setIsactive('nouveau rapport');
            }}
          >
            saisie
          </button>
        </li>

        <li
          className={`flex text-base mt-5 pl-2 items-center h-12 rounded-lg ${
            isActive === 'rapport'
              ? 'bg-white dark:bg-input dark:to-customGray shadow-buttonShadow transform scale-110'
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
              handleClickLink('/tousmesrapports');
              setIsactive('rapport');
            }}
          >
            Mes rapports
          </button>
        </li>

        <li
          className={`flex text-base mt-5 pl-2 items-center h-12 rounded-lg ${
            isActive === 'projet'
              ? 'bg-white dark:bg-input dark:to-customGray shadow-buttonShadow transform scale-110'
              : 'dark:hover:bg-mainBg hover:bg-whiteGray  hover:shadow-buttonShadow  transform hover:scale-110'
          } `}
        >
          <img
            src={projet}
            className="mr-3 mb-1 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full"
            alt="homesvg"
          />
          <button
            className="focus:outline-none"
            onClick={() => {
              handleClickLink('/mesprojets');
              setIsactive('projet');
            }}
          >
            Projets
          </button>
        </li>

        <li
          className={`flex text-base mt-5 pl-2 items-center h-12 rounded-lg ${
            isActive === 'settings'
              ? 'bg-white dark:bg-input dark:to-customGray shadow-buttonShadow transform scale-110'
              : 'dark:hover:bg-mainBg hover:bg-whiteGray  hover:shadow-buttonShadow  transform hover:scale-110'
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

export default User;
