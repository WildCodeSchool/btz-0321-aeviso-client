import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { jobs } from '../../API/requests';
import Spinner from '../Spinner';
import CreateProfessionsForm from './CreateProfessionsForm';

function Jobs(): JSX.Element {
  const [jobList, setJobList] = useState<Job[]>([]);
  const { isLoading, error } = useQuery<Job[], AxiosError>('jobs', jobs.getAll, {
    onSuccess: (data) => setJobList(data),
  });

  if (isLoading) return <Spinner />;
  if (error) return <p>An error has occurred: {error.message}</p>;

  return (
    <div>
      <h3 className="mb-6">Profession test</h3>
      <div>
        {jobList?.map((profession) => {
          return (
            <div key={profession.id} className="border border-black mb-2">
              <Link to={`/profession/${profession.id}`}>
                {profession.label} {profession.label}
              </Link>
            </div>
          );
        })}
      </div>
      <CreateProfessionsForm setJobList={setJobList} />
    </div>
  );
}

export default Jobs;