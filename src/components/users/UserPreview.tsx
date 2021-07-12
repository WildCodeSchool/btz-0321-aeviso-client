import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { user } from '../../API/requests';
import JobDisplay from '../jobs/JobDisplay';
import Modal from '../Modal';

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
      <p className="font-bold sm:text-xl mb-1">
        {data?.firstName} {data?.lastName}
      </p>
      <div className=" flex flex-col sm:flex-row">
        <p className="text-gray-300">
          Fonction:{' '}
          <span>
            <JobDisplay id={data?.jobId as string} />
          </span>{' '}
          /{' '}
        </p>
        <p className="text-gray-300">email: {data?.email}</p>
      </div>
    </div>
  );
}

export default UserPreview;
