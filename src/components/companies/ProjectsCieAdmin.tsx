import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { companies } from '../../API/requests';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import Spinner from '../Spinner';
import SearchInput from '../SearchInput';

function ProjectsCieAdmin(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { register, watch } = useForm();

  const searchInput = watch('search');

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
      <div className="py-4 px-5 text-lg font-bold flex items-center justify-between bg-white dark:bg-component shadow-inputShadow sm:sticky sm:top-0 ">
        <p className="text-2xl font-bold">Projets</p>
        <SearchInput register={register} name="search" />
      </div>
      {data
        ?.filter((project) => {
          const included = project.name.toLowerCase().includes(searchInput?.toLowerCase());

          // at first mount searchInput is undefined,
          // so we use a ternary to ensure we have list at first render
          return searchInput ? included : true;
        })
        ?.map((project) => {
          return (
            <div key={project.id} className="flex-row justify-around mt-3 mx-4 border-b pb-2">
              <Link to={`/projects/${project.id}`}>
                <p className="font-bold" key={project.id}>
                  {project.name} / {project.code}
                </p>
                <p className="text-xs font-thin">Total demi journées déclarées: </p>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default ProjectsCieAdmin;
