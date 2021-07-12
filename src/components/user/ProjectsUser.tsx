import React from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { user } from '../../API/requests';
import Spinner from '../Spinner';
import { useUserFromStore } from '../../store/user.slice';
import SearchInput from '../SearchInput';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function ProjectsUser(): JSX.Element {
  const { user: userFromStore } = useUserFromStore();
  console.log(userFromStore.id);
  const { register, watch } = useForm();

  const searchInput = watch('search');

  const { isLoading, error, data } = useQuery<Project[], AxiosError>(['projects', userFromStore.id], () =>
    user.getProjects(userFromStore.id as string)
  );
  console.log(data);
  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-black dark:text-white">An error occurred: {error.message}</p>;
  }

  return (
    <div className="text-black dark:text-white">
      <div className="py-4 px-5 text-lg font-bold flex  justify-between items-center bg-white dark:bg-component shadow-inputShadow sm:sticky sm:top-0 ">
        <div>
          <p className="text-2xl font-bold">
            {userFromStore.firstName} {userFromStore.lastName}
          </p>
          <p>{userFromStore.email}</p>
        </div>
        <button className="focus:outline-none border sm:text-sm text-xs p-2 text-white shadow-buttonShadow rounded-md bg-customBlue">
          Modifier les informations
        </button>
      </div>
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
