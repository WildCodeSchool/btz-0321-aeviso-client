import React, { Dispatch, SetStateAction } from 'react';
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

interface sideBarProps {
  sideBarClass: string;
  setIsSidebarVisible: Dispatch<SetStateAction<boolean>>;
  setSideBarClass: Dispatch<SetStateAction<string>>;
  user: UserReduxState;
}

function SideBar({ sideBarClass, setSideBarClass, user }: sideBarProps): JSX.Element {
  const handleClose = () => {
    setSideBarClass(
      'flex flex-col bg-black  h-full shadow-mainShadow  rounded-xl text-white font-roboto justify-between invisible sm:visible'
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
      <div className="h-20  border-t border-white  p-6">
        <h2 className="text-xl font-bold">
          {user.firstName} {user.lastName}
        </h2>
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootState) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(SideBar);
