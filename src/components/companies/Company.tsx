import React from 'react';
import InformationsCompany from './InformationsCompany';
import ProjectsCieAdmin from './ProjectsCieAdmin';

function Company(): JSX.Element {
  return (
    <div className="grid sm:grid-cols-2  grid-cols-1 grid-rows-2 gap-5 h-full w-full">
      <div className="text-white  sm:col-start-1 sm:row-start-1 sm:row-end-2 col-start-1 bg-white dark:bg-component rounded-xl shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
        <ProjectsCieAdmin />
      </div>
      <div className="text-white sm:col-start-2 sm:row-start-1 sm:row-end-2 col-start-1 row-start-2 bg-black rounded-xl shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
        <InformationsCompany />
      </div>
      <div className="text-white sm:col-start-1 sm:col-end-3 sm:row-start-2 sm:row-end-5 row-start-3 row-end-4 col-start-1 bg-black rounded-xl shadow-mainShadow mx-4 sm:mx-0">
        HELLO
      </div>
    </div>
  );
}

export default Company;
