import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
<<<<<<< HEAD:src/components/frontTestRoads/user/User.tsx
import Modal from '../../Modal';
import UserForm from './UserForm';
import { user } from '../../../API/requests';
=======
import Modal from '../Modal';
import UserForm from './UserForm';
import { user } from '../../API/requests';
>>>>>>> dev:src/components/users/User.tsx

function User(): JSX.Element {
  const [isModal, setIsModal] = useState(false);
  const [message, setMessage] = useState('');

  const { id }: { id: string } = useParams();

  const { isLoading, error, data } = useQuery<User, Error>(['user', id], () => user.getOne(id), { cacheTime: 0 });

  const { mutate } = useMutation(() => user.delete({ id }), {
    onSuccess: () => {
      setMessage('Utilisateur supprimé');
      setIsModal((prevState) => !prevState);
    },
  });

  if (isModal) {
    return <Modal message={message} handleClick={() => setIsModal((prevState) => !prevState)} />;
  }
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error has occurred: {error.message}</p>;
  return (
    <div>
      <UserForm
        mutationFn={user.update}
<<<<<<< HEAD:src/components/frontTestRoads/user/User.tsx
        initFirstname={data?.firstName}
        initLastname={data?.lastName}
        initEmail={data?.email}
        initProfession={data?.jobId}
=======
        initFirstname={data?.firstName || ''}
        initLastname={data?.lastName || ''}
        initEmail={data?.email || ''}
        initJobId={data?.jobId || ''}
        initCompanyId={data?.companyId || ''}
        initRole={data?.role || 'USER'}
        initWeeklyBasis={data?.weeklyBasis || 'h35'}
>>>>>>> dev:src/components/users/User.tsx
        setIsModal={setIsModal}
        setMessage={setMessage}
      />
      <button onClick={() => mutate()}>Supprimer</button>
    </div>
  );
}

export default User;
