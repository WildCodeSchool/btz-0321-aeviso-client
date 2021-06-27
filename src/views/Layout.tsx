import React, { useState } from 'react';
import { Switch } from 'react-router-dom';
import Routes from '../../src/components/Routes';

import Head from '../components/head';

import SideBar from '../components/NavBar.tsx/sideBar';

function Layout(): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);

  const [sideBarClass, setSideBarClass] = useState(
    'sm:flex flex-col border-2 dark:border-blue bg-white dark:bg-black w-full h-full rounded-lg text-black dark:text-white font-roboto justify-between shadow-mainShadow invisible sm:visible'
  );

  return (
    <div
      className={
        isDarkMode
          ? 'grid bg-whiteGray sm:grid-rows-desktop sm:grid-cols-desktop grid-cols-phone grid-rows-mobile sm:gap-x-5  min-h-screen sm:max-h-screen sm:p-5'
          : 'grid bg-darkgray dark sm:grid-rows-desktop sm:grid-cols-desktop grid-cols-phone grid-rows-mobile sm:gap-x-5  min-h-screen sm:max-h-screen sm:p-5'
      }
    >
      <div className="sm:col-start-1 sm:col-end-2 sm:row-start-1 sm:row-end-4 row-start-1 row-end-6 col-start-1">
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
      <div className="sm:row-start-1 sm:row-end-2 sm:col-start-1  sm:col-end-3 row-start-1 row-end-2 col-start-1 items-end  text-black dark:text-white font-roboto sm:flex justify-between mx-4 mt-5 sm:m-0">
        <Head setSideBarClass={setSideBarClass} setIsSidebarVisible={setIsSidebarVisible} />
      </div>
      <div className="h-full sm:row-start-1 row-start-2 row-end-4 col-start-1 sm:col-start-2">
        <Switch>
          <Routes />
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
