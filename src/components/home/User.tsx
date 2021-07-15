import React from 'react';
import { useUserFromStore } from '../../store/user.slice';
import AllRecordsUser from '../user/AllRecordsUser';
import InfoUser from '../user/InfoUser';
import ProjectsUser from '../user/ProjectsUser';
import OneCollaborator from '../users/OneCollaborator';

function User(): JSX.Element {
  const { user } = useUserFromStore();
  return (
    <div className="grid sm:grid-cols-2 grif-col-1 grid-rows-3 sm:grid-rows-4 gap-5 h-full w-full text-white">
      {user.role === 'ADMIN' ? (
        <div className="sm:row-start-1 h-96 sm:h-full row-end-2 sm:col-start-1 sm:row-end-3 sm:col-end-2 col-start-1 border-2 dark:border-componentBorder bg-white dark:bg-component rounded-lg shadow-buttonShadow dark:shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
          <AllRecordsUser />
        </div>
      ) : (
        <div className="sm:row-start-1 h-96 sm:h-full sm:col-start-1 sm:row-end-2 sm:col-end-2 col-start-1 border-2 dark:border-componentBorder bg-white dark:bg-component rounded-lg shadow-buttonShadow dark:shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
          <InfoUser />
        </div>
      )}
      {user.role === 'ADMIN' ? (
        <div className="sm:row-start-3 h-96 sm:h-full sm:col-start-1 sm:row-end-5 sm:col-end-2 col-start-1 border-2 dark:border-componentBorder bg-white dark:bg-component rounded-lg shadow-buttonShadow dark:shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
          <ProjectsUser />
        </div>
      ) : (
        <div className="sm:row-start-2 h-96 sm:h-full sm:col-start-1 sm:row-end-5 sm:col-end-2 col-start-1 border-2 dark:border-componentBorder bg-white dark:bg-component rounded-lg shadow-buttonShadow dark:shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
          <ProjectsUser />
        </div>
      )}
      <div className="sm:row-start-1 h-96 sm:h-full sm:col-start-2 sm:row-end-5 sm:col-end-2 col-start-1 border-2 dark:border-componentBorder bg-white dark:bg-component rounded-lg shadow-buttonShadow dark:shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
        {user.role === 'ADMIN' ? <OneCollaborator /> : <AllRecordsUser />}
      </div>
    </div>
  );
}

export default User;
