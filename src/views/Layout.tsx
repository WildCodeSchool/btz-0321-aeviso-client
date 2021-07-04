import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Switch, useHistory } from 'react-router-dom';
import { auth } from '../API/requests';

import Head from '../components/head';
import Routes from '../../src/components/Routes';
import SideBar from '../components/NavBar.tsx/sideBar';
import Spinner from '../components/Spinner';
import store, { actions } from '../assets/redux/store';

function Layout(): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);

  const [sideBarClass, setSideBarClass] = useState(
    'sm:flex flex-col border-2 dark:border-lightblue bg-white dark:bg-customBlue w-full h-full rounded-lg text-black dark:text-white font-roboto justify-between shadow-mainShadow invisible sm:visible'
  );

  const history = useHistory();

  const { isLoading } = useQuery<{ message: string; user: User }>('userAuthenticated', () => auth.me(), {
    onSuccess: (data) => {
      const { user } = data;
      store.dispatch({
        type: actions.LOGIN,
        payload: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          logged: true,
        },
      });
      history.push('/aeviso');
    },
    onError: () => history.push('/home'),
  });

  if (isLoading) return <Spinner />;

  return (
    <div
      className={`grid sm:grid-rows-desktop sm:grid-cols-desktop grid-cols-phone grid-rows-mobile sm:gap-x-5  min-h-screen sm:max-h-screen sm:p-5 ${
        isDarkMode ? 'bg-whiteGray' : 'bg-darkGray dark'
      }`}
    >
      <div className="sm:col-start-1 sm:col-end-2 sm:row-start-1 sm:row-end-3 row-start-1 row-end-6 col-start-1">
        {isSidebarVisible ? (
          <SideBar
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            setIsSidebarVisible={setIsSidebarVisible}
            setSideBarClass={setSideBarClass}
            sideBarClass={sideBarClass}
          />
        ) : (
          ''
        )}
      </div>
      <div className="sm:hidden row-start-1 row-end-2 col-start-1 items-end  text-black dark:text-white font-roboto  justify-between mx-4 mt-5 sm:m-0">
        <Head setSideBarClass={setSideBarClass} setIsSidebarVisible={setIsSidebarVisible} />
      </div>
      <div className="h-full sm:row-start-1 sm:row-end-4 row-start-2 row-end-4 col-start-1 sm:col-start-2">
        <Switch>
          <Routes />
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
