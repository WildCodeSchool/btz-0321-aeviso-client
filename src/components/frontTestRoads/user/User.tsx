import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Modal from '../../Modal';
import UserForm from './UserForm';
import { user } from '../../../API/requests';
import Spinner from '../../Spinner';
import getModal from '../../../hooks/useModal';

function User(): JSX.Element {
  const { isModal, setIsModal, message, setMessage } = getModal();

  const { id }: { id: string } = useParams();

  const { isLoading, error, data } = useQuery<User, Error>(['user', id], () => user.getOne(id), { cacheTime: 0 });

  const buttons = [{ text: 'OK!' }];

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

  if (isModal) {
    return (
      <Modal title="Succès" buttons={buttons}>
        {message}
      </Modal>
    );
  }
  if (isLoading) return <Spinner />;
  if (error) return <p>An error has occured: {error.message}</p>;
  return (
    <div>
      <UserForm
        mutationFn={user.update}
        initFirstname={data?.firstName || ''}
        initLastname={data?.lastName || ''}
        initEmail={data?.email || ''}
        initJobId={data?.jobId || ''}
        initCompanyId={data?.companyId || ''}
        initRole={data?.role || 'USER'}
        initWeeklyBasis={data?.weeklyBasis || 'h35'}
        setIsModal={setIsModal}
        setMessage={setMessage}
      />
      <button onClick={() => mutate()}>Supprimer</button>
    </div>
  );
}

export default User;
