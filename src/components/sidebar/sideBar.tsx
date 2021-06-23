import React, { Dispatch, SetStateAction, useState } from 'react';
import Home from '../../../media/icons/Home.svg';
import Rapport from '../../../media/icons/folder.svg';
import Réglages from '../../../media/icons/Settings.svg';
import useWindowDimensions from '../../Hook/useWindowDimension';
import Cross from '../../../media/icons/Cross.svg';
import NavSuperAdmin from './NavSuperAdmin';
import NavAdmin from './NavAdmin';

interface sideBarProps {
  sideBarClass: string;
  setIsSidebarVisible: Dispatch<SetStateAction<boolean>>;
}

function SideBar({ sideBarClass, setIsSidebarVisible }: sideBarProps): JSX.Element {
  const [role, setRole] = useState('SUPERADMIN');
  const { width } = useWindowDimensions();
  const handleClose = () => {
    if (width < 1200) {
      setIsSidebarVisible(false);
    } else {
      setIsSidebarVisible(true);
    }
  };

  return (
    <div className={sideBarClass}>
      <div className="py-8 px-8 ">
        <div className="flex justify-between">
          {width < 1200 ? (
            <div className="flex justify-between w-full">
              <div className="flex-col h-full">
                <h1 className="sm:text-5xl text-5xl  font-bold">aeviso</h1>
                <h2 className="text-sm">Expert Comptable.audit.conseil</h2>
              </div>
              <button className="focus:outline-none" onClick={handleClose}>
                <img className="h-5 w-5" src={Cross} alt="CloseButton" />{' '}
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
        {role === 'SUPERADMIN' ? (
          <NavSuperAdmin handleClose={handleClose} Home={Home} Rapport={Rapport} Réglages={Réglages} />
        ) : (
          ''
        )}
        {role === 'ADMIN' ? (
          <NavAdmin handleClose={handleClose} Home={Home} Rapport={Rapport} Réglages={Réglages} />
        ) : (
          ''
        )}
      </div>

      <div className="h-20  border-t border-white  p-6">
        <h2 className="text-xl font-bold">Maxime Savoie</h2>
      </div>
    </div>
  );
}

export default SideBar;
