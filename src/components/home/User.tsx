import React from 'react';
import { useUserFromStore } from '../../store/user.slice';
import ProjectsUser from '../user/ProjectsUser';

function User(): JSX.Element {
  const { user } = useUserFromStore();
  return (
    <div className="grid   grid-cols-1 grid-rows-2 gap-5 h-full w-full text-white">
      <div className="sm:col-start-1 sm:row-start-1 sm:row-end-5 col-start-1  border-2 dark:border-componentBorder bg-white dark:bg-component rounded-lg shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
        <ProjectsUser />
      </div>
    </div>
  );
}

export default User;
