import React, { useState, useEffect } from 'react';

import useWindowDimensions from '../Hook/useWindowDimension';
import Head from '../components/head';

import SideBar from '../components/sideBar';

function Layout(): JSX.Element {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);
  const { width } = useWindowDimensions();
  const [sideBarClass, setSideBarClass] = useState(
    'flex flex-col bg-black w-96  h-screen text-white font-roboto justify-between'
  );

  useEffect(() => {
    if (width < 900) {
      setIsSidebarVisible(false);
    } else {
      setIsSidebarVisible(true);
    }
  }, [width]);

  return (
    <div
      className="flex justify-center"
      style={{
        background: 'linear-gradient(298.31deg, #232323 0%, rgba(22, 22, 22, 0.78) 84.83%)',
      }}
    >
      {isSidebarVisible ? <SideBar setIsSidebarVisible={setIsSidebarVisible} sideBarClass={sideBarClass} /> : ''}
      {/* <Header /> */}

      <div className="grid sm:grid-rows-desktop sm:grid-cols-desktop grid-cols-phone grid-rows-mobile sm:gap-x-5 h-screen w-full sm:w-9/12 pb-5  px-3 overflow-y-auto">
        <div className="w-full sm:col-start-1 sm:mb-2 sm:col-end-4 items-end  text-white font-roboto sm:flex pt-3 px-2 justify-between">
          <Head setSideBarClass={setSideBarClass} setIsSidebarVisible={setIsSidebarVisible} />
        </div>

        <div className="sm:col-start-1 sm:row-start-2 sm:row-end-3 bg-black rounded-xl shadow-mainShadow sm:ml-5">
          Component1
        </div>
        <div className="mt-5 sm:m-0 sm:col-start-2 sm:row-start-2 sm:row-end-3 bg-black rounded-xl shadow-mainShadow">
          Component2
        </div>
        <div className="mt-5 sm:mx-0 sm:mt-5 sm:col-start-1 sm:col-end-3 sm:row-start-3 sm:row-end-5 bg-black rounded-xl shadow-mainShadow sm:ml-5">
          Component3
        </div>
      </div>
    </div>
  );
}

export default Layout;
