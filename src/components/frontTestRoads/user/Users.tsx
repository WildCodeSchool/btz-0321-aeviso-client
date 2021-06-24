import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { user } from '../../../API/requests';
import Modal from '../../Modal';
import Spinner from '../../Spinner';
import UserForm from './UserForm';

function Users(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [isModal, setIsModal] = useState(false);
  const [message, setMessage] = useState<string>('');

  const { isLoading, error } = useQuery<User[], AxiosError>('users', user.getAll, {
    onSuccess: (data) => setUsers(data),
  });

  if (isLoading) return <Spinner />;
  if (error) return <p>An error has occurred: {error.message}</p>;

  if (isModal) return <Modal message={message} handleClick={() => setIsModal((prevState) => !prevState)} />;

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
