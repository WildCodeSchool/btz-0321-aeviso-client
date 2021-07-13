import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectForm from './ProjectForm';
import UsersInProject from './UsersInProject';

function CreateUpdateProjects(): JSX.Element {
  const { id }: { id: string } = useParams();

  if (id)
    return (
      <div>
        <ProjectForm projectId={id} />
        {id && <UsersInProject projectId={id} />}
      </div>
    );

  return (
    <div>
      <ProjectForm />
    </div>
  );
}

export default CreateUpdateProjects;
