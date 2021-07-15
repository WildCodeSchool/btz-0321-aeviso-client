import React from 'react';
import AllRecordsUser from '../user/AllRecordsUser';
import InfoUser from '../user/InfoUser';
import ProjectsUser from '../user/ProjectsUser';

function User(): JSX.Element {
  return (
    <div className="grid   grid-cols-2 grid-rows-4 gap-5 h-full w-full text-white">
      <div className="sm:row-start-1 sm:col-start-1 sm:row-end-2 sm:col-end-2 col-start-1 border-2 dark:border-componentBorder bg-white dark:bg-component rounded-lg shadow-buttonShadow dark:shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
        <InfoUser />
      </div>
      <div className="sm:row-start-2 sm:col-start-1 sm:row-end-5 sm:col-end-2 col-start-1 border-2 dark:border-componentBorder bg-white dark:bg-component rounded-lg shadow-buttonShadow dark:shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
        <ProjectsUser />
      </div>
      <div className="sm:row-start-1 sm:col-start-2 sm:row-end-5 sm:col-end-2 col-start-1 border-2 dark:border-componentBorder bg-white dark:bg-component rounded-lg shadow-buttonShadow dark:shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
        <AllRecordsUser />
      </div>
    </div>
  );
}

export default User;
