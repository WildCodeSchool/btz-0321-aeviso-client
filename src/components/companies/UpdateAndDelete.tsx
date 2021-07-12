import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import { companies, user } from '../../API/requests';
import useModal from '../../hooks/useModal';
import Modal from '../Modal';
import Spinner from '../Spinner';
import CreateCompany from './CreateCompany';

function UpdateAndDelete(): JSX.Element {
  const [isUpdateForm, setIsUpdateForm] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const { isLoading, error, data } = useQuery<Company, AxiosError>(['company', id], () => companies.getOne(id));

  const { mutate } = useMutation(() => companies.delete(id), {
    onSuccess: () => {
      setMessage('Client supprimé');
      setIsModal((prevState) => !prevState);
    },
    onError: () => {
      setMessage('Une erreur est survenue');
      setIsModal((prevState) => !prevState);
    },
  });
  const { isModal, setIsModal, setMessage, message } = useModal();

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

  if (isModal)
    return (
      <Modal
        title="Supprimer un client"
        buttons={
          !error
            ? [{ text: 'ok', handleClick: () => history.push('/clients') }]
            : [{ text: 'Nouvel essai', handleClick: () => setIsModal((prevState) => !prevState) }]
        }
      >
        {message}
      </Modal>
    );

  return (
    <div>
      {isUpdateForm ? (
        <CreateCompany mutationFn={companies.put} mutationUs={user.create} data={data} />
      ) : (
        <div className="p-5 text-black dark:text-white">
          <h2 className="text-xl font-bold mr-2">Modifier ou suprrilmer les informations de {data?.name}</h2>
          <div className=" flex justify-between items-stretch p-2">
            <button
              onClick={() => setIsUpdateForm(true)}
              className="focus:outline-none ounded-sm h-9 text-white shadow-buttonShadow px-4 py-1 mr-3 bg-customGreen"
            >
              Modifier
            </button>

            <button
              onClick={() => mutate()}
              className="rounded-sm h-9 text-white shadow-buttonShadow px-4 py-1 bg-customRed"
            >
              Supprimer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateAndDelete;
