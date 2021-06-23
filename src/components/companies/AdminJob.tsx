import React from 'react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { jobs } from '../../API/requests';

interface IProps {
  jobId: string;
}

function AdminJob({ jobId }: IProps): JSX.Element {
  const { data } = useQuery<Job, AxiosError>(['jobs', jobId], () => jobs.getOne(jobId));
  console.log(data);
  return <>{data?.label}</>;
}

export default AdminJob;
