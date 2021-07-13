import React, { useState } from 'react';
import { Switch, useHistory, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';

import Head from '../components/Head';
import Routes from '../../src/components/Routes';
import { auth } from '../API/requests';
import Sidebar from '../components/navigation/Sidebar';
import Spinner from '../components/Spinner';
import { useUserFromStore } from '../store/user.slice';

function Layout(): JSX.Element {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
  const [sideBarClass, setSideBarClass] = useState(
    'sm:flex flex-col border-2 dark:border-componentBorder bg-white dark:bg-component w-full h-full rounded-lg text-black dark:text-white font-roboto justify-between shadow-buttonShadow dark:shadow-mainShadow invisible sm:visible'
  );

  const history = useHistory();
  const { pathname } = useLocation();

  const { dispatchLogin } = useUserFromStore();

  const { isLoading } = useQuery<{ message: string; user: User }>('userAuthenticated', () => auth.me(), {
    retry: false,
    onSuccess: (data) => {
      const { user } = data;
      dispatchLogin(user);

      history.push(pathname);
    },
    onError: () => history.push('/home'),
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="grid sm:grid-rows-desktop sm:grid-cols-desktop grid-cols-phone grid-rows-mobile sm:gap-x-5  min-h-screen sm:max-h-screen sm:p-5 bg-whiteGray dark:bg-mainBg">
      <div className="sm:col-start-1 sm:col-end-2 sm:row-start-1 sm:row-end-3 row-start-1 row-end-6 col-start-1">
        {isSidebarVisible ? (
          <Sidebar
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
