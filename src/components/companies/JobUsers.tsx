import React from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';

import { jobs } from '../../API/requests';
import Spinner from '../Spinner';

function JobUsers({ id }: { id: string }): JSX.Element {
  const { isLoading, error, data } = useQuery<Job, AxiosError>(['jobs', id], () => jobs.getOne(id));

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

  return <>{data?.label}</>;
}

export default JobUsers;
