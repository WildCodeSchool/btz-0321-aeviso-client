import React from 'react';
import Collaborators from '../users/Collaborators';
import ExportRecords from '../records/Exporter/ExportRecords';
import ProjectList from '../project/ProjectList';

function Admin(): JSX.Element {
  return (
    <div className="h-full">
      <div className="grid sm:grid-cols-2 grid-cols-1 grid-rows-2 gap-5 h-full">
        <div className="sm:col-start-1 sm:row-start-1 sm:row-end-2 col-start-1 border-2 dark:border-componentBorder bg-white dark:bg-component rounded-md shadow-buttonShadow dark:shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
          <ProjectList />
        </div>
        <div className="sm:col-start-1 sm:row-start-2 sm:row-end-4 col-start-1 row-start-2 border-2 dark:border-componentBorder  bg-white dark:bg-component rounded-md shadow-buttonShadow dark:shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
          <ExportRecords />
        </div>
        <div className="sm:col-start-2 mb-10 sm:mb-0 sm:col-end-3 sm:row-start-1 sm:row-end-4 row-start-3 row-end-4 col-start-1 border-2 dark:border-componentBorder  bg-white dark:bg-component rounded-md shadow-buttonShadow dark:shadow-mainShadow  mx-4 sm:mx-0">
          <Collaborators />
        </div>
      </div>
    </div>
  );
}
export default Admin;
