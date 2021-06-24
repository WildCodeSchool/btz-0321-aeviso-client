import React, { Dispatch, SetStateAction, useState } from 'react';
import Home from '../../../media/icons/Home.svg';
import Rapport from '../../../media/icons/folder.svg';
import Réglages from '../../../media/icons/Settings.svg';
import Cross from '../../../media/icons/Cross.svg';
import NouveauRapport from '../../../media/icons/NouveauRapport.svg';
import SUPERADMIN from './SUPERADMIN';
import ADMIN from './ADMIN';
import USER from './USER';

interface sideBarProps {
  sideBarClass: string;
  setIsSidebarVisible: Dispatch<SetStateAction<boolean>>;
  setSideBarClass: Dispatch<SetStateAction<string>>;
}

function SideBar({ sideBarClass, setSideBarClass }: sideBarProps): JSX.Element {
  const [user, setUser] = useState<string>('SUPERADMIN');
  const handleClose = () => {
    setSideBarClass(
      'flex flex-col bg-black  h-full shadow-mainShadow  rounded-xl text-white font-roboto justify-between invisible sm:visible'
    );
  };

  const handleSP = () => {
    setUser('SUPERADMIN');
  };

  const handleAD = () => {
    setUser('ADMIN');
  };

  const handleUS = () => {
    setUser('USER');
  };

  return (
    <div className={sideBarClass}>
      <div className="py-8 px-8 ">
        <div className="flex justify-between">
          <div className="flex justify-between w-full sm:hidden">
            <div className="flex-col h-full">
              <h1 className="sm:text-5xl text-5xl  font-bold">aeviso</h1>
              <h2 className="text-sm">Expert Comptable.audit.conseil</h2>
            </div>
            <button className="focus:outline-none" onClick={handleClose}>
              <img className="h-5 w-5" src={Cross} alt="CloseButton" />{' '}
            </button>
          </div>
        </div>
        {user === 'SUPERADMIN' ? (
          <SUPERADMIN handleClose={handleClose} Home={Home} Rapport={Rapport} Réglages={Réglages} />
        ) : (
          ''
        )}
        {user === 'ADMIN' ? (
          <ADMIN
            Home={Home}
            Rapport={Rapport}
            Réglages={Réglages}
            NouveauRapport={NouveauRapport}
            handleClose={handleClose}
          />
        ) : (
          ''
        )}
        {user === 'USER' ? (
          <USER
            handleClose={handleClose}
            NouveauRapport={NouveauRapport}
            Home={Home}
            Rapport={Rapport}
            Réglages={Réglages}
          />
        ) : (
          ''
        )}
      </div>

      <div className=" text-xs flex flex-col h-20 border-t border-white p-6">
        <button onClick={handleSP}>SUPERADMIN</button>
        <button onClick={handleAD}>ADMIN</button>
        <button onClick={handleUS}>USER</button>
      </div>
    </div>
  );
}

export default SideBar;
