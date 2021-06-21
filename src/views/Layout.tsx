import React, { useState, useEffect } from 'react';

import useWindowDimensions from '../Hook/useWindowDimension';
import Head from '../components/head';

import SideBar from '../components/sideBar';
import Records from '../components/records/Records';
import Companies from '../components/companies/Companies';

function Layout(): JSX.Element {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);
  const { width } = useWindowDimensions();
  const [sideBarClass, setSideBarClass] = useState(
    'flex flex-col bg-black w-full h-full rounded-xl text-white font-roboto justify-between'
  );

  useEffect(() => {
    if (width < 1100) {
      setIsSidebarVisible(false);
    } else {
      setIsSidebarVisible(true);
    }
  }, [width]);

  return (
    <div className="grid sm:grid-rows-desktop sm:grid-cols-desktop grid-cols-phone grid-rows-mobile sm:gap-x-5 z-screen sm:h-screen sm:p-5">
      <div className="sm:col-start-1 sm:col-end-2 sm:row-start-2 sm:row-end-6 row-start-1 row-end-6 col-start-1">
        {isSidebarVisible ? <SideBar setIsSidebarVisible={setIsSidebarVisible} sideBarClass={sideBarClass} /> : ''}
      </div>
      <div className="sm:row-start-1 sm:row-end-2 sm:col-start-1 sm:mb-2 sm:col-end-4 row-start-1 row-end-2 col-start-1 items-end  text-white font-roboto sm:flex justify-between mx-4 mt-5 sm:m-0">
        <Head setSideBarClass={setSideBarClass} setIsSidebarVisible={setIsSidebarVisible} />
      </div>

      <div className="sm:col-start-2 sm:row-start-2 sm:row-end-3 row-start-2 row-end-2 col-start-1 bg-black rounded-xl shadow-mainShadow mx-4 sm:mx-0">
        <Companies />
      </div>
      <div className="mt-5 sm:m-0 sm:col-start-3 sm:row-start-2 sm:row-end-3 col-start-1 row-start-3 bg-black rounded-xl shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
        <Records />
      </div>
      <div className="mt-5 sm:m-0 sm:mt-5 sm:col-start-2 sm:col-end-4 sm:row-start-3 sm:row-end-5 row-end-5 col-start-1 bg-black rounded-xl shadow-mainShadow mx-4 mb-5">
        Component3
      </div>
    </div>
  );
}

export default Layout;
