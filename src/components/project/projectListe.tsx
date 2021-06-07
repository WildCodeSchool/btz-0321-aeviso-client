import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

interface Project {
  id: number;
  name: string;
  description: string;
}

function ProjectList({ setIsProject }: { setIsProject: Function }) {
  const { isLoading, error, data } = useQuery('projects', () => {
    return axios.get('http://localhost:5000/api/v1/projects');
  });
  if (isLoading) {
    return <p>IsLoading...</p>;
  } else if (error) {
    return <h1>Error Sorry...</h1>;
  }

  const handleClick = () => {
    setIsProject(false);
  };

  return (
    <div className="font-roboto mx-10 my-10">
      <h1 className="text-4xl font-bold">Project List</h1>
      {data!.data.map((project: Project) => {
        return (
          <div className="w-6/12 mt-8" key={project.id}>
            <h1 className="text-xl font-medium">{project.name}</h1>
            <p className="mt-2">{project.description}</p>
            <button onClick={handleClick} className="w-36 mt-2 border-black border">
              See more ...
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ProjectList;
