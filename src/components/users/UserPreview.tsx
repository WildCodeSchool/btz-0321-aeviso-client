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
      <Link to={`/collaborateurs/oneuser/${data?.id}`}>
        <p className="font-bold sm:text-xl mb-1">
          {data?.firstName} {data?.lastName}
        </p>
        <div className=" flex flex-col sm:flex-row">
          <p className="text-sm text-gray-400">
            Fonction:{' '}
            <span>
              <JobDisplay id={data?.jobId as string} />
            </span>{' '}
            /{' '}
          </p>
          <p className="text-sm text-gray-400">email: {data?.email}</p>
        </div>
      </Link>
    </div>
  );
}

export default UserPreview;
