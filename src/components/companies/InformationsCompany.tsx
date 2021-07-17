import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { companies } from '../../API/requests';
import Spinner from '../Spinner';
import Modal from '../Modal';
import useModal from '../../hooks/useModal';

function InformationsCompany(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { isModal, setIsModal, setMessage, message } = useModal();
  const {
    isLoading,
    error,
    data: usersCompany,
  } = useQuery<User[], AxiosError>(['user', id], () => companies.getUsers(id, 'ADMIN'));

  const { data: companyData } = useQuery<Company, AxiosError>(['company', id], () => companies.getOne(id));

  const { mutate } = useMutation(() => companies.delete(id), {
    onSuccess: () => {
      setMessage('Client supprimé');
      setIsModal(true);
    },
    onError: () => {
      setMessage('Une erreur est survenue : Veuillez effacez les projets et les collaborateurs avant');
      setIsModal(true);
    },
  });

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
            ? [{ text: 'Valider', handleClick: () => history.push('/aeviso') }]
            : [{ text: 'Nouvel essai', handleClick: () => setIsModal((prevState) => !prevState) }]
        }
      >
        {message}
      </Modal>
    );

  return (
    <div className="text-black dark:text-white">
      <div className="px-4 text-lg font-bold flex justify-between items-center bg-white dark:bg-component shadow-inputShadow sm:sticky sm:top-0 ">
        <p className="text-2xl mr-2">{companyData?.name}</p>
        <button
          onClick={() => mutate()}
          className="rounded-md text-sm h-7 mb-5 mt-5 ml-4 text-white shadow-buttonShadow px-4 py-1 bg-customRed"
        >
          Supprimer le client
        </button>
      </div>
      <div>
        {usersCompany?.map((data) => (
          <div key={data.id} className="mt-5 mx-4">
            <div className="mb-3 border-b pb-2">
              <p className="font-bold text-sm">Administrateur</p>
              <p className="text-sm font-thin">
                {data.firstName} {data.lastName}
              </p>
            </div>
            <div className="border-b pb-2 mt-5 mb-2">
              <p className="font-bold text-sm">Contact</p>
              <a className="text-sm font-thin" href={`mailto: ${data.email}`}>
                Envoyer un email: {data.email}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InformationsCompany;
