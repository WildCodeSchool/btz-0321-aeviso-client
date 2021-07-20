import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { companies } from '../../API/requests';
import { Link } from 'react-router-dom';

import Spinner from '../Spinner';

function ProjectsCieAdmin(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  const { isLoading, error, data } = useQuery<Project[], AxiosError>(['projects', { companyId: id }], () =>
    companies.getAllProjects(id)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <p>
        An error has occurred: {error.message}. Code: {error.code}
      </p>
    );
  }

  return (
    <div className="text-black dark:text-white">
      <div className="sm:py-4 py-2 px-5 text-lg font-bold flex items-center justify-between bg-white dark:bg-component shadow-inputShadow sm:sticky sm:top-0 ">
        <p className="text-2xl font-bold">Projets</p>
      </div>
      {data?.map((project) => {
        return (
          <div key={project.id} className="flex-row justify-around mt-5 mx-4 border-b pb-2">
            <Link to={`/projets/${project.id}`}>
              <p className="font-bold text-sm" key={project.id}>
                {project.name} / {project.code}
              </p>
              <p className="text-xs mt-1 font-thin truncate">{project.description}</p>
            </Link>
          </div>
        );
      })}
      {data?.length === 0 && (
        <p className="mt-5 text-2xl mx-3 font-bold text-mainBg text-opacity-70">
          {"Cette entreprise n'a pas encore de projet de recherche et développement"}
        </p>
      )}
    </div>
  );
}

export default ProjectsCieAdmin;
