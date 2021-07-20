import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { user } from '../../API/requests';
import JobDisplay from '../jobs/JobDisplay';
import Modal from '../Modal';
import { Link } from 'react-router-dom';

interface IProps {
  id: string;
}

function UserPreview({ id }: IProps): JSX.Element {
  const { isLoading, isError, data } = useQuery<User, AxiosError>(['users', id], () => user.getOne(id));

  if (isLoading) return <p>...</p>;

  if (isError)
    return (
      <Modal title="Erreur" buttons={[{ text: 'OK' }]}>
        Une erreur est survenue
      </Modal>
    );
  return (
    <div className="my-5 border-b border-gray-400 pb-2">
      <Link to={`/collaborateurs/${data?.id}`}>
        <p className="font-bold sm:text-sm mb-1">
          {data?.firstName} {data?.lastName}
        </p>
        <div className=" flex flex-col">
          <p className="text-xs text-gray-400">
            Fonction:{' '}
            <span>
              <JobDisplay id={data?.jobId as string} />
            </span>{' '}
          </p>
          <p className="text-xs mt-1 text-gray-400">email: {data?.email}</p>
        </div>
      </Link>
    </div>
  );
}

export default UserPreview;
