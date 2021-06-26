import React from 'react';
import Records from '../../components/records/Records';
import Companies from '../../components/companies/Companies';

function SuperAdmin(): JSX.Element {
  return (
    <div className="grid sm:grid-cols-2  grid-cols-1 grid-rows-2 gap-5 h-full w-full">
      <div className="sm:col-start-1 sm:row-start-1 sm:row-end-2 col-start-1 bg-white dark:bg-black rounded-lg shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
        <Companies />
      </div>
      <div className="sm:col-start-2 sm:row-start-1 sm:row-end-2 col-start-1 row-start-2 bg-white dark:bg-black rounded-lg shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
        <Records />
      </div>
      <div className="sm:col-start-1 sm:col-end-3 sm:row-start-2 sm:row-end-5 row-start-3 row-end-4 col-start-1 bg-white dark:bg-black rounded-lg shadow-mainShadow  mx-4 sm:mx-0">
        Component3
      </div>
    </div>
  );
}

export default SuperAdmin;
