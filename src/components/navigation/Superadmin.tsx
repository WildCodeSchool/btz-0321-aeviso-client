import React, { useState } from 'react';
import Client from '../../../media/icons/Client.svg';

interface ISPNavbar {
  handleClickLink: (url: string) => void;
  Home: string;
  report: string;
  settings: string;
}

function SuperAdmin({ report, settings, handleClickLink }: ISPNavbar): JSX.Element {
  const [isActive, setIsactive] = useState<string>('');
  return (
    <div>
      {' '}
      <nav className="list-none pt-10">
        <li
          className={`flex text-base mt-2 pl-2 items-center h-12 rounded-lg ${
            isActive === 'client'
              ? 'bg-white dark:bg-input dark:to-customGray shadow-buttonShadow transform scale-110'
              : 'dark:hover:bg-mainBg hover:bg-whiteGray hover:shadow-buttonShadow  transform hover:scale-110'
          } `}
        >
          <img
            src={Client}
            className="mr-3 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full mb-1"
            alt="homesvg"
          />
          <button
            className="focus:outline-none"
            onClick={() => {
              handleClickLink('/');
              setIsactive('client');
            }}
          >
            Clients
          </button>
        </li>
        <li
          className={`flex text-base mt-5 pl-2 items-center h-12 rounded-lg ${
            isActive === 'export'
              ? 'bg-white dark:bg-input dark:to-customGray shadow-buttonShadow transform scale-110'
              : 'dark:hover:bg-mainBg hover:bg-whiteGray hover:shadow-buttonShadow  transform hover:scale-110'
          } `}
        >
          <img
            src={report}
            className="mr-3 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full mb-1"
            alt="homesvg"
          />
          <button
            className="focus:outline-none"
            onClick={() => {
              handleClickLink('/rapport/exporter');
              setIsactive('export');
            }}
          >
            Exporter un rapport
          </button>
        </li>
        <li
          className={`flex text-base mt-5 pl-2 items-center h-12 rounded-lg ${
            isActive === 'settings'
              ? ' bg-white dark:bg-input shadow-buttonShadow transform scale-110'
              : 'dark:hover:bg-mainBg hover:bg-whiteGray hover:shadow-buttonShadow  transform hover:scale-110'
          } `}
        >
          <img
            src={settings}
            className="mr-3 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full mb-1"
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

export default SuperAdmin;
