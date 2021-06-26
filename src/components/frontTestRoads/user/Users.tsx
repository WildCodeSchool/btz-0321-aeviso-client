import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { user } from '../../../API/requests';
import getModal from '../../../Hook/useModal';
import Modal from '../../Modal';
import Spinner from '../../Spinner';
import UserForm from './UserForm';

function Users(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const { isModal, setIsModal, message, setMessage } = getModal();

  const { isLoading } = useQuery<User[], AxiosError>('users', user.getAll, {
    onSuccess: (data) => setUsers(data),
    onError: () => {
      setMessage('Une erreur est survenue');
      setIsModal((prevState) => !prevState);
    },
  });

  if (isLoading) return <Spinner />;

  if (isModal)
    return (
      <Modal title="Utilisateurs" buttons={[{ text: 'Ok', handleClick: () => setIsModal((prevState) => !prevState) }]}>
        {message}
      </Modal>
    );

  return (
    <div>
      <h3 className="mb-6">Users test</h3>
      <div>
        {users?.map((user) => {
          return (
            <div key={user.id} className="border border-black mb-2">
              <Link to={`/user/${user.id}`}>
                <p>
                  {user.firstName} {user.lastName}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
      <UserForm mutationFn={user.create} setIsModal={setIsModal} setMessage={setMessage} />
    </div>
  );
}

export default Users;
