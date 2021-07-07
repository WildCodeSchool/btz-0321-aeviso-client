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
    <div className="dark:bg-component bg-white h-full sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-mainShadow mx-4 sm:mx-0 px-5 py-6 overflow-y-auto ">
      <div className="flex justify-between items-center">
        <p className="text-3xl font-bold">{projectData?.name}</p>
        <button
          onClick={history.goBack}
          className="focus:outline-none border px-5 py-1 rounded-md shadow-buttonShadow ml-2 bg-customGreen text-white"
        >
          Retour
        </button>
      </div>
      <div className=" flex justify-between mt-5 items-center">
        <p className="text-xl font-bold">Informations</p>
        <button className="focus:outline-none border sm:text-sm text-xs p-2 text-white shadow-buttonShadow rounded-md bg-customBlue">
          Modifier les informations
        </button>
      </div>
      <p className="mt-5 text-xl">{"Total d'heures RD déclarées : "}</p>
      <div className="mt-5">
        <p className="font-bold">Statut Juridique : {projectData?.taxation}</p>
        <p className="font-bold mt-2">Description:</p>
        <p className="mt-2 text-sm">{projectData?.description}</p>
      </div>

      <div className="mt-7">
        <p className="text-2xl font-bold">Collaborateurs</p>
        {usersData?.map((user) => {
          return (
            <>
              <div className="mt-3 border-b pb-1" key={user.id}>
                <p className="font-bold">
                  {user.firstName} {user.lastName}
                </p>
                <p>
                  Poste : <JobUsers id={user.jobId} /> {user.email}{' '}
                </p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default DetailsProjects;
