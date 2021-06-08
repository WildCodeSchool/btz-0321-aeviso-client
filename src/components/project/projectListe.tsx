import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { project } from '../../API/requests';

function ProjectList() {
  const { isLoading, error, data } = useQuery<Project[]>('projects', project.getAll);
  if (isLoading) {
    return <p>IsLoading...</p>;
  } else if (error) {
    return <h1>Error Sorry...</h1>;
  }

  return (
    <div className="font-roboto mx-10 my-10">
      <h1 className="text-4xl font-bold">Project List</h1>
      {data!.map((project) => {
        return (
          <div className="w-6/12 mt-8" key={project.id}>
            <h1 className="text-xl font-medium">{project.name}</h1>
            <p className="mt-2">{project.description}</p>
            <Link className="w-36 mt-2 border-black border" to={`/projects/${project.id}`}>
              See more ...
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default ProjectList;
