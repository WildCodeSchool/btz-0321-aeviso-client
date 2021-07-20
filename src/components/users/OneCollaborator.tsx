import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import { jobs, user } from '../../API/requests';
import useModal from '../../hooks/useModal';
import Modal from '../Modal';
import Spinner from '../Spinner';
import CreateNewUser from './CreateUser';
interface Params {
  id: string;
}

function OneCollaborator(): JSX.Element {
  const { id } = useParams<Params>();
  const { isModal, setIsModal, setMessage, message } = useModal();
  const [isForm, setIsForm] = useState<boolean>(false);
  const history = useHistory();

  const { isLoading: userLoading, error: userError, data } = useQuery<User>(['user', id], () => user.getOne(id));

  const { mutate } = useMutation(() => user.delete({ id }), {
    onSuccess: () => {
      setMessage('Utilisateur supprimé');
      setIsModal((prevState) => !prevState);
    },
    onError: () => {
      setMessage('Une erreur est survenue');
      setIsModal((prevState) => !prevState);
    },
  });

  const jobId = data?.jobId;

  const {
    isLoading: jobLoading,
    error: jobError,
    data: job,
  } = useQuery(['job', jobId], () => jobs.getOne(jobId as string), {
    enabled: Boolean(jobId),
  });

  const handleClick = () => {
    setIsForm(true);
  };

  const loading = jobLoading || userLoading;
  const error = userError || jobError;
  if (loading) {
    return <Spinner />;
  }
  if (error)
    return (
      <Modal title="Erreur" buttons={[{ text: 'OK' }]}>
        Une erreur est survenue
      </Modal>
    );

  return (
    <div>
      {isModal && (
        <Modal
          title="Supprimer un utilisateur"
          buttons={
            !error
              ? [{ text: 'Valider', handleClick: () => history.push('/collaborateurs') }]
              : [{ text: 'Nouvel essai', handleClick: () => setIsModal((prevState) => !prevState) }]
          }
        >
          {message}
        </Modal>
      )}
      {isForm ? (
        <CreateNewUser setIsForm={setIsForm} mutationFn={user.update} />
      ) : (
        <div className="dark:bg-component p-5 bg-white border-2 dark:border-componentBorder h-full sm:w-full text-black dark:text-white font-roboto">
          <div className="flex w-full flex-col sm:flex-row justify-between">
            <div className="flex font-bold text-xl items-center sm:text-3xl">
              <p className="mr-2">{data?.lastName} /</p>
              <p>{data?.firstName}</p>
            </div>
          </div>
          <div className="mt-5 sm:mt-10 border-b border-gray-300 pb-2">
            <p>Email</p>
            <p className=" text-sm font-bold">{data?.email}</p>
          </div>
          <div className="mt-5 sm:mt-10 border-b border-gray-300 pb-2">
            <p>Fonction</p>
            <p className=" text-sm font-bold">{job?.label}</p>
          </div>
          <div className="mt-5 sm:mt-10 border-b border-gray-300 pb-2">
            <p>Base hebdomadaire</p>
            {data?.weeklyBasis === 'h35' ? (
              <p className="font-bold text-sm">35 heures</p>
            ) : (
              <p className="font-bold text-sm">39 heures</p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row w-full justify-between sm:mt-5">
            <button
              onClick={handleClick}
              className="focus:outline-none text-white shadow-buttonShadow mt-5 w-full sm:w-4/12 py-1 sm:h-8 sm:rounded-md rounded-md bg-customGreen "
            >
              Modifier
            </button>
            <button
              onClick={() => mutate()}
              className="focus:outline-none text-white shadow-buttonShadow mt-5 w-full sm:w-4/12 py-1 sm:h-8 sm:rounded-md rounded-md bg-customRed"
            >
              Supprimer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OneCollaborator;
