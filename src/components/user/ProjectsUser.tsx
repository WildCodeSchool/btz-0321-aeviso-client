import React from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { user } from '../../API/requests';
import { useUserFromStore } from '../../store/user.slice';
import SearchInput from '../SearchInput';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function ProjectsUser(): JSX.Element {
  const { user: userFromStore } = useUserFromStore();
  const { register, watch } = useForm();

  const searchInput = watch('search');

  const {
    isLoading: projectsIsLoading,
    error: projectsError,
    data: projectsData,
  } = useQuery<Project[], AxiosError>(['projects', userFromStore.id], () =>
    user.getProjects(userFromStore.id as string)
  );

  if (projectsIsLoading) {
    return <p>...</p>;
  }

  const error = projectsError;
  if (error) {
    return <p className="text-black dark:text-white">An error occurred: {error.message}</p>;
  }

  return (
    <div className="dark:bg-component h-full bg-white sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-buttonShadow dark:shadow-mainShadow mx-4 sm:mx-0  overflow-y-auto">
      <div className="py-4 px-5 text-lg font-bold flex items-center justify-between bg-white dark:bg-component shadow-inputShadow sm:sticky sm:top-0 ">
        <p className="text-3xl font-bold">Projets en cours</p>
        <SearchInput register={register} name="search" />
      </div>
      <div className="mx-2">
        {projectsData
          ?.filter((project) => {
            const included = project.name.toLowerCase().includes(searchInput?.toLowerCase());
            return searchInput ? included : true;
          })
          ?.map((project) => {
            return (
              <div key={project.id} className="flex-row justify-around mt-5 mx-4 border-b pb-2">
                <Link to={`/projets/${project.id}`}>
                  <p className="font-bold" key={project.id}>
                    {project.name}
                  </p>
                  <p className="truncate w-56 text-gray-400 sm:w-96">{project.description}</p>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ProjectsUser;
