import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectForm from './ProjectForm';
import UsersInProject from './UsersInProject';

function CreateUpdateProjects(): JSX.Element {
  const { id }: { id: string } = useParams();

  if (id)
    return (
      <div className="flex flex-col p-5 sm:flex-row h-full w-full text-black dark:text-white font-roboto overflow-y-auto">
        {id && <UsersInProject projectId={id} />}
        <ProjectForm projectId={id} />
      </div>
    );

  return (
    <div className="dark:bg-component bg-white h-full sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-mainShadow  overflow-y-auto">
      <ProjectForm />
    </div>
  );
}

export default CreateUpdateProjects;
