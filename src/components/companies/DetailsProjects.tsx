import React from 'react';
import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';

import { project } from '../../API/requests';
import Spinner from '../Spinner';
import JobUsers from './JobUsers';

function DetailsProjects(): JSX.Element {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const {
    isLoading: projectIsLoading,
    error: projectError,
    data: projectData,
  } = useQuery<Project, AxiosError>(['projects', id], () => project.getOne(id));

  const {
    isLoading: usersIsLoading,
    error: usersErrors,
    data: usersData,
  } = useQuery<IResultUser[], AxiosError>(
    ['users', { projectId: projectData?.id }],
    () => project.getUsers(projectData?.id as string),
    {
      enabled: Boolean(projectData),
    }
  );

  if (projectIsLoading || usersIsLoading) {
    return <Spinner />;
  }

  const error = projectError || usersErrors;

  if (error) {
    return (
      <p>
        An error has occurred: {error.message}. Code: {error.code}
      </p>
    );
  }

  return (
    <div className="flex flex-col justify-between dark:bg-component bg-white h-full sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-buttonShadow dark:shadow-mainShadow mx-4 sm:mx-0 px-5 py-6 overflow-y-auto ">
      <div>
        <div className="flex justify-between items-center">
          <div>
            <p className="sm:text-xl text-lg">Nom du Projets</p>
            <p className="sm:text-3xl mt-2 text-xl font-bold">{projectData?.name}</p>
          </div>
          <button
            onClick={history.goBack}
            className="focus:outline-none px-5 py-1 rounded-md shadow-buttonShadow ml-2 bg-customGreen text-white"
          >
            Retour
          </button>
        </div>

        <p className="text-2xl font-bold mt-5">Informations</p>

        <div className="mt-5 sm:mt-8">
          <p className="font-bold text-xl">Statut Juridique : {projectData?.taxation}</p>
          <p className="font-bold mt-8 text-2xl">Description</p>
          <p className="mt-2 text-sm">{projectData?.description}</p>
        </div>

        <div className="mt-8 overflow-y-auto">
          <p className="text-3xl font-bold">Collaborateurs</p>
          {usersData?.map((user) => {
            return (
              <div className="mt-5 border-b pb-1" key={user.id}>
                <p className="font-bold text-lg">
                  {user.firstName} {user.lastName}
                </p>
                <div className="flex text-sm text-gray-400">
                  <JobUsers id={user.jobId} /> / {user.email}{' '}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex w-full items-center justify-between bg-white dark:bg-component">
        <button className="focus:outline-none sm:text-sm text-xs p-2 text-white shadow-buttonShadow rounded-md bg-customBlue">
          Modifier les informations
        </button>
        <button className="focus:outline-none  sm:text-sm text-xs p-2 text-white shadow-buttonShadow rounded-md bg-customRed">
          Supprimer le projet
        </button>
      </div>
    </div>
  );
}

export default DetailsProjects;
