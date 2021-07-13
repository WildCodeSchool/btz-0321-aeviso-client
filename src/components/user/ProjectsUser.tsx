import React from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { user, jobs } from '../../API/requests';
import Spinner from '../Spinner';
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

  const {
    isLoading: jobsIsLoading,
    error: jobsError,
    data: jobsData,
  } = useQuery<Job, AxiosError>(['jobs', userFromStore.jobId], () => jobs.getOne(userFromStore.jobId as string));

  if (projectsIsLoading || jobsIsLoading) {
    return <Spinner />;
  }

  const error = jobsError || projectsError;
  if (error) {
    return <p className="text-black dark:text-white">An error occurred: {error.message}</p>;
  }

  return (
    <div className="text-black dark:text-white">
      <div className="py-4 px-5 text-lg font-bold flex flex-col justify-start items-start bg-white dark:bg-component  sm:sticky sm:top-0 ">
        <p className="text-2xl font-bold ">
          {userFromStore.firstName} {userFromStore.lastName}
        </p>
        <p>{userFromStore.email}</p>
        <p>{jobsData?.label}</p>
      </div>
      <div className="py-4 px-5 text-lg font-bold flex items-center justify-between bg-white dark:bg-component shadow-inputShadow sm:sticky sm:top-0 ">
        <p className="text-2xl font-bold">Projets</p>
        <SearchInput register={register} name="search" />
      </div>
      {projectsData
        ?.filter((project) => {
          const included = project.name.toLowerCase().includes(searchInput?.toLowerCase());

          // at first mount searchInput is undefined,
          // so we use a ternary to ensure we have list at first render
          return searchInput ? included : true;
        })
        ?.map((project) => {
          return (
            <div key={project.id} className="flex-row justify-around mt-3 mx-4 border-b pb-2">
              <Link to={`/projects/${project.id}/records`}>
                <p className="font-bold" key={project.id}>
                  {project.name}
                </p>
                <p>{project.description}</p>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default ProjectsUser;
