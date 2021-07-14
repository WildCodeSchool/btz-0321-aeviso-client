import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectForm from './ProjectForm';
import UsersInProject from './UsersInProject';

function CreateUpdateProjects(): JSX.Element {
  const { id }: { id: string } = useParams();

  if (id)
    return (
      <div className="dark:bg-component bg-white h-full sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-mainShadow mx-4 sm:mx-0 sm:px-10 px-5 py-5 overflow-y-auto">
        <ProjectForm projectId={id} />
        {id && <UsersInProject projectId={id} />}
      </div>
    );

  return (
    <div className="dark:bg-component bg-white h-full sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-mainShadow mx-4 sm:mx-0 sm:px-10 px-5 py-5 overflow-y-auto">
      <ProjectForm />
    </div>
  );
}

export default CreateUpdateProjects;
