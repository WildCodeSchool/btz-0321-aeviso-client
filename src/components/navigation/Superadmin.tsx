import React from 'react';
import Client from '../../../media/icons/Client.svg';

interface ISPNavbar {
  handleClickLink: (url: string) => void;
  Home: string;
  report: string;
  settings: string;
}

function SuperAdmin({ report, settings, handleClickLink }: ISPNavbar): JSX.Element {
  return (
    <div>
      {' '}
      <nav className="list-none pt-10">
        <li className="flex text-lg mt-3 items-center h-14 ">
          <img
            src={Client}
            className="mr-3 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full mb-1"
            alt="homesvg"
          />
          <button className="focus:outline-none" onClick={() => handleClickLink('/aeviso')}>
            Clients
          </button>
        </li>
        <li className="flex text-lg mt-3 items-center h-14">
          <img
            src={report}
            className="mr-3 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full mb-1"
            alt="homesvg"
          />
          <button className="focus:outline-none" onClick={() => handleClickLink('/records/export')}>
            Rapport
          </button>
        </li>
        <li className="flex text-lg mt-3 items-center h-14">
          <img
            src={settings}
            className="mr-3 h-6 w-6 bg-component dark:bg-component shadow-buttonShadow p-1 rounded-full mb-1"
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

export default SuperAdmin;
