import React from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';

import { jobs } from '../../API/requests';

function JobDisplay({ id }: { id: string }): JSX.Element {
  const { isLoading, error, data } = useQuery<Job, AxiosError>(['jobs', id], () => jobs.getOne(id));

  if (isLoading) {
    return <p>...</p>;
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

export default JobDisplay;
