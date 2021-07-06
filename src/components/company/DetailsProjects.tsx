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
    <div className="dark:bg-black bg-white h-full sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-mainShadow mx-4 sm:mx-0 py-6 sm:px-10 p-5">
      <div className="text-white sm:col-start-1 sm:row-start-1 sm:row-end-2 col-start-1 bg-black rounded-xl shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
        <div>
          <div className="flex justify-between p-2 items-center">
            <p className="text-3xl">{projectData?.name}</p>
            <button onClick={history.goBack} className="border p-2 ml-2 bg-green-600">
              Retour
            </button>
          </div>
          <div className=" flex justify-between items-stretch">
            <p className="text-xl">Informations</p>
            <button className="border p-2 mr-2 bg-blue-400">Modifier les informations</button>
          </div>
          <p className="py-6 text-xl">{"Total d'heures RD déclarées : "}</p>

          <div className="divide-y pb-6">
            <p>Statut Juridique : {projectData?.taxation}</p>
            <p>Description:</p>
            <p>{projectData?.description}</p>
          </div>

          <div className="divide-y">
            <p className="text-xl pb-4">Collaborateurs</p>
            {usersData?.map((user) => {
              return (
                <>
                  <div className="" key={user.id}>
                    <p>
                      {user.firstName} {user.lastName}
                    </p>
                    <p>
                      Poste : <JobUsers id={user.jobId} /> || {user.email}{' '}
                    </p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsProjects;
