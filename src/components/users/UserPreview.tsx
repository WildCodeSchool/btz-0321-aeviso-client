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
    <div>
      {data?.firstName} {data?.lastName}
      <JobDisplay id={data?.jobId as string} />
    </div>
  );
}

export default UserPreview;
