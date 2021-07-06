import React from 'react';

function Admin(): JSX.Element {
  return (
    <div className="grid sm:grid-cols-2  grid-cols-1 grid-rows-2 gap-5 h-full w-full">
      <div className="sm:col-start-1 sm:row-start-1 sm:row-end-2 col-start-1 border-2 dark:border-componentBorder bg-white dark:bg-component rounded-lg shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
        <p className="text-black dark:text-white">Admin</p>
      </div>
      <div className="sm:col-start-2 sm:row-start-1 sm:row-end-2 col-start-1 row-start-2 border-2 dark:border-componentBorder  bg-white dark:bg-component rounded-lg shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
        <p className="text-black dark:text-white">Admin</p>
      </div>
      <div className="sm:col-start-1 sm:col-end-3 sm:row-start-2 sm:row-end-5 row-start-3 row-end-4 col-start-1 border-2 dark:border-componentBorder  bg-white dark:bg-component rounded-lg shadow-mainShadow  mx-4 sm:mx-0">
        <p className="text-black dark:text-white">Admin</p>
      </div>
    </div>
  );
}

export default Admin;