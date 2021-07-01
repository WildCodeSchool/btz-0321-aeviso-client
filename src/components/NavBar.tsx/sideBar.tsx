import React, { Dispatch, SetStateAction, useState } from 'react';
import { connect } from 'react-redux';
import Home from '../../../media/icons/Home.svg';
import Rapport from '../../../media/icons/folder.svg';
import Réglages from '../../../media/icons/Settings.svg';
import Cross from '../../../media/icons/Cross.svg';
import NouveauRapport from '../../../media/icons/NouveauRapport.svg';
import SUPERADMIN from './SUPERADMIN';
import ADMIN from './ADMIN';
import USER from './USER';
import store, { actions, RootState } from '../../assets/redux/store';
import { useHistory } from 'react-router-dom';
import Togglebutton from '../../assets/ToggleButton';

interface sideBarProps {
  sideBarClass: string;
  setIsSidebarVisible: Dispatch<SetStateAction<boolean>>;
  setSideBarClass: Dispatch<SetStateAction<string>>;
  user: UserReduxState;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
  isDarkMode: boolean;
}

function SideBar({ isDarkMode, setIsDarkMode, sideBarClass, setSideBarClass, user }: sideBarProps): JSX.Element {
  const [toggleClass, setToggleClass] = useState('bg-black focus:outline-none h-7 mr-2 rounded-full w-7');
  const handleClose = () => {
    setSideBarClass(
      'flex flex-col dark:bg-black bg-white h-full shadow-mainShadow rounded-xl text-black dark:text-white font-roboto justify-between invisible sm:visible'
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
      setIsDarkMode(false);
      setToggleClass('bg-black focus:outline-none mr-4 h-7 rounded-full w-7');
    } else {
      setIsDarkMode(true);
      setToggleClass('bg-white focus:outline-none h-6 ml-6 rounded-full w-6');
    }
  };

  return (
    <div className={sideBarClass}>
      <div className="py-8 px-8 ">
        <div className="flex justify-between">
          <div className="flex justify-between items-center w-full">
            <div className="flex-col h-full">
              <h1 className="sm:text-5xl text-5xl  font-bold">aeviso</h1>
              <h2 className="text-sm">Expert Comptable.audit.conseil</h2>
            </div>
            <button className="focus:outline-none sm:hidden" onClick={handleClose}>
              <img className="h-6 w-6 bg-black  rounded-full p-1 shadow-buttonShadow" src={Cross} alt="CloseButton" />{' '}
            </button>
          </div>
        </div>
        {user.role === 'SUPERADMIN' ? (
          <SUPERADMIN handleClose={handleClose} Home={Home} Rapport={Rapport} Réglages={Réglages} />
        ) : (
          ''
        )}
        {user.role === 'ADMIN' ? (
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
        {user.role === 'USER' ? (
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
      <div className=" flex h-28 border-t border-black dark:border-white items-center justify-between p-5 ">
        <div>
          <h2 className="text-xl font-bold">
            {user.firstName} {user.lastName}
          </h2>
          <button
            className="w-12/12 mt-2 text-xs text-white bg-red py-1 px-2 rounded-sm shadow-buttonShadow"
            onClick={handleLogout}
          >
            Déconnexion
          </button>
        </div>
        <div className="flex h-full place-items-end">
          <Togglebutton handleDarkMode={handleDarkMode} toggleClass={toggleClass} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootState) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(SideBar);
