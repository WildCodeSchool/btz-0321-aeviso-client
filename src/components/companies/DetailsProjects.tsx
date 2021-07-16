import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import { project } from '../../API/requests';
import Spinner from '../Spinner';
import JobUsers from './JobUsers';
import { useUserFromStore } from '../../store/user.slice';
import RecordsUser from '../user/RecordsUser';
import Modal from '../Modal';
import useModal from '../../hooks/useModal';

function DetailsProjects(): JSX.Element {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { isModal, setIsModal, setMessage, message } = useModal();
  const { user: userFromStore } = useUserFromStore();

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

  const { mutate } = useMutation(() => project.delete(id), {
    onSuccess: () => {
      setMessage('Client supprimé');
      setIsModal(true);
    },
    onError: () => {
      setMessage('Une erreur est survenue : Veuillez effacez les projets et les collaborateurs avant');
      setIsModal(true);
    },
  });

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

  if (isModal)
    return (
      <Modal
        title="Supprimer un client"
        buttons={
          !error
            ? [{ text: 'Valider', handleClick: () => history.push('/aeviso') }]
            : [{ text: 'Nouvel essai', handleClick: () => setIsModal((prevState) => !prevState) }]
        }
      >
        {message}
      </Modal>
    );

  return (
    <div className="flex flex-col p-2 dark:bg-component bg-white h-full sm:w-full text-black dark:text-white font-roboto rounded-md shadow-buttonShadow dark:shadow-mainShadow overflow-y-auto">
      <div className="p-5 bg-white dark:bg-component">
        <div className="flex justify-between items-center">
          <div>
            <p className="sm:text-3xl mt-2 text-xl font-bold">Projet : {projectData?.name}</p>
          </div>
          <button
            onClick={history.goBack}
            className="focus:outline-none px-5 py-1 rounded-md shadow-buttonShadow ml-2 bg-customGreen text-white"
          >
            Retour
          </button>
        </div>

        <p className="text-3xl font-bold mt-8">Informations</p>

        <div className=" flex items-end mt-2 sm:mt-5">
          <p className="text-lg">Fiscalité : {projectData?.taxation} </p>
          {projectData?.taxation === 'CIR' && <p className="ml-2">Credit Impôt Recherche</p>}
          {projectData?.taxation === 'CII' && <p className="ml-2">Credit Impôt Innovation</p>}
          {projectData?.taxation === 'CII' && <p className="ml-2">{"N'est pas éligible"}</p>}
        </div>
        <p className="mt-2 text-lg">Description du projet :</p>
        <p className="mt-1 text-sm sm:text-base">{projectData?.description}</p>
        {userFromStore.role === 'USER' && <RecordsUser projectId={projectData!.id} />}

        <div className="mt-12">
          <div className="flex w-full flex-col sm:flex-row justify-between">
            <p className="text-3xl font-bold">Collaborateurs sur ce projet</p>
            {userFromStore.role === 'ADMIN' && (
              <Link to={`/modifier/projets/${projectData?.id}`}>
                <p className="focus:outline-none sm:text-sm mt-3 sm:mt-0 text-xs p-2 text-white shadow-buttonShadow rounded-md bg-customBlue">
                  Modifier les informations et les collaborateurs
                </p>
              </Link>
            )}
          </div>
        </div>

        {usersData?.map((user) => {
          return (
            <div className="mt-5 border-b pb-1" key={user.id}>
              <p className="font-bold text-lg">
                {user.firstName} {user.lastName}
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center text-xs sm:text-sm text-gray-400">
                <JobUsers id={user.jobId} />
                <p className="mt-1 sm:mt-0 sm:ml-2">Contact : {user.email} </p>
              </div>
            </div>
          );
        })}
        {usersData?.length === 0 && (
          <p className="mt-5 text-4xl font-bold text-mainBg text-opacity-70">
            {"Aucun Collaborateurs n'est affecter à ce projet"}
          </p>
        )}
      </div>

      {userFromStore.role === 'ADMIN' ? (
        <div className="py-5 flex w-full h-44  px-5 items-center justify-between bg-white dark:bg-component">
          <button
            onClick={() => mutate()}
            className="focus:outline-none  sm:text-sm text-xs p-2 text-white shadow-buttonShadow rounded-md bg-customRed"
          >
            Supprimer le projet
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default DetailsProjects;
