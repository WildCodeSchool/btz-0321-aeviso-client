import React, { Dispatch, SetStateAction } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Home from '../../../media/icons/Home.svg';
import report from '../../../media/icons/folder.svg';
import settings from '../../../media/icons/Settings.svg';
import Cross from '../../../media/icons/Cross.svg';
import newReport from '../../../media/icons/NouveauRapport.svg';
import SuperAdmin from './Superadmin';
import Admin from './Admin';
import User from './User';
import Togglebutton from '../ToggleButton';
import { today } from '../../assets/date';
import { useUserFromStore } from '../../store/user.slice';

interface ISideBarProps {
  sideBarClass: string;
  setIsSidebarVisible: Dispatch<SetStateAction<boolean>>;
  setSideBarClass: Dispatch<SetStateAction<string>>;
}

function SideBar({ sideBarClass, setSideBarClass }: ISideBarProps): JSX.Element {
  const history = useHistory();

  const handleClose = () => {
    setSideBarClass(
      'flex flex-col border-2 dark:border-componentBorder dark:bg-component bg-white h-full shadow-buttonShadow dark:shadow-mainShadow rounded-xl text-black dark:text-white font-roboto justify-between invisible sm:visible'
    );
  };

  const handleClickLink = (url: string) => {
    handleClose();
    history.push(url);
  };

  const { user } = useUserFromStore();

  const todayDate = () => {
    return today().charAt(0).toUpperCase() + today().slice(1);
  };

  return (
    <div className={sideBarClass}>
      <div className="py-8 px-8 ">
        <div className="flex justify-between">
          <div className="flex justify-between w-full">
            <div className="flex-col h-full">
              <h1 className="sm:text-5xl text-5xl  font-bold">aeviso</h1>
              <h2 className="text-sm">Expert Comptable.Audit.Conseil</h2>
            </div>
            <button className="focus:outline-none sm:hidden" onClick={handleClose}>
              <img
                className="h-6 w-6 bg-component rounded-full p-1 shadow-buttonShadow"
                src={Cross}
                alt="CloseButton"
              />{' '}
            </button>
          </div>
        </div>
        {user.role === 'SUPERADMIN' ? (
          <SuperAdmin handleClickLink={handleClickLink} Home={Home} report={report} settings={settings} />
        ) : (
          ''
        )}
        {user.role === 'ADMIN' ? (
          <Admin
            Home={Home}
            report={report}
            settings={settings}
            newReport={newReport}
            handleClickLink={handleClickLink}
          />
        ) : (
          ''
        )}
        {user.role === 'USER' ? (
          <User
            handleClickLink={handleClickLink}
            newReport={newReport}
            Home={Home}
            report={report}
            settings={settings}
          />
        ) : (
          ''
        )}
      </div>
      <div className=" flex flex-col w-full h-40 justify-end">
        <h2 className="text-base mr-3 text-right mb-2">{todayDate()}</h2>
        <div className="flex flex-row justify-between p-5 border-t border-black dark:border-componentBorder">
          <div className="">
            <h2 className="text-xl font-bold mb-2">
              {user.firstName} {user.lastName}
            </h2>
            <Link
              className="focus:outline-none w-12/12  text-xs text-white bg-customRed py-1 px-2 rounded-sm shadow-buttonShadow"
              to="/logout"
            >
              Déconnexion
            </Link>
          </div>
          <div className="flex h-full items-end">
            <Togglebutton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
