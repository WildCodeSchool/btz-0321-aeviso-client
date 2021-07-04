import React, { Dispatch, SetStateAction, useState } from 'react';
import { connect } from 'react-redux';
import Home from '../../../media/icons/Home.svg';
import report from '../../../media/icons/folder.svg';
import settings from '../../../media/icons/Settings.svg';
import Cross from '../../../media/icons/Cross.svg';
import newReport from '../../../media/icons/NouveauRapport.svg';
import SUPERADMIN from './SUPERADMIN';
import ADMIN from './ADMIN';
import USER from './USER';
import store, { actions, RootState } from '../../assets/redux/store';
import { useHistory } from 'react-router-dom';
import Togglebutton from '../../assets/ToggleButton';
import { today } from '../../assets/date';

interface sideBarProps {
  sideBarClass: string;
  setIsSidebarVisible: Dispatch<SetStateAction<boolean>>;
  setSideBarClass: Dispatch<SetStateAction<string>>;
  user: UserReduxState;
  isDarkMode: boolean;
}

function SideBar({ isDarkMode, sideBarClass, setSideBarClass, user }: sideBarProps): JSX.Element {
  const [toggleClass, setToggleClass] = useState('bg-component focus:outline-none h-7 mr-2 rounded-full w-7');
  const handleClose = () => {
    setSideBarClass(
      'flex flex-col border-2 dark:border-componentBorder dark:bg-component bg-white h-full shadow-mainShadow rounded-xl text-black dark:text-white font-roboto justify-between invisible sm:visible'
    );
  };
  const history = useHistory();
  const handleLogout = () => {
    store.dispatch({
      type: actions.LOGOUT,
      payload: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        role: null,
        logged: false,
      },
    });
    history.push('/home');
  };

  const handleDarkMode = () => {
    if (isDarkMode) {
      store.dispatch({
        type: actions.TOGGLEDARKMODE,
        payload: {
          darkMode: false,
        },
      });
      setToggleClass('bg-component focus:outline-none mr-4 h-7 rounded-full w-7');
    } else {
      setIsDarkMode(true);
      setToggleClass('bg-white focus:outline-none h-6 ml-6 rounded-full w-6');
    }
  };

  return (
    <div className={sideBarClass}>
      <div className="py-8 px-8 ">
        <div className="flex justify-between">
          <div className="flex justify-between w-full">
            <div className="flex-col h-full">
              <h1 className="sm:text-5xl text-5xl  font-bold">aeviso</h1>
              <h2 className="text-sm">Expert Comptable.audit.conseil</h2>
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
          <SUPERADMIN handleClose={handleClose} Home={Home} report={report} settings={settings} />
        ) : (
          ''
        )}
        {user.role === 'ADMIN' ? (
          <ADMIN Home={Home} report={report} settings={settings} newReport={newReport} handleClose={handleClose} />
        ) : (
          ''
        )}
        {user.role === 'USER' ? (
          <USER handleClose={handleClose} newReport={newReport} Home={Home} report={report} settings={settings} />
        ) : (
          ''
        )}
      </div>
      <div className=" flex flex-col w-full h-40 justify-end">
        <h2 className="text-base mr-3 text-right mb-2">{today()}</h2>
        <div className="flex flex-row justify-between p-5 border-t rounded-lg border-black dark:border-componentBorder">
          <div className="">
            <h2 className="text-xl font-bold">
              {user.firstName} {user.lastName}
            </h2>
            <button
              className="outline:focus-none w-12/12 mt-2 text-xs text-white bg-customRed py-1 px-2 rounded-sm shadow-buttonShadow"
              onClick={handleLogout}
            >
              Déconnexion
            </button>
          </div>
          <div className="flex h-full items-end">
            <Togglebutton handleDarkMode={handleDarkMode} toggleClass={toggleClass} />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootState) => {
  return { user: state.user, isDarkMode: state.darkMode };
};

export default connect(mapStateToProps)(SideBar);
