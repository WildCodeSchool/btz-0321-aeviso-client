import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { jobs, project } from '../../../API/requests';

interface IOneUser {
  firstName: string;
  lastName: string;
  projectId: string;
  userId: string;
  job: string;
  start: Date | null;
  end: Date | null;
  weeklyBasis: IResultUser['weeklyBasis'];
}

function OneUser({ firstName, lastName, projectId, userId, job, start, end }: IOneUser): JSX.Element {
  const [jobName, setJobName] = useState<Job>();
  const [records, setRecords] = useState<IRecord[]>([]);

  const getTotalHours = (basis: string, number: number) => {
    if (basis === 'h35') {
      return number * 3.5;
    }
    if (basis === 'h39') {
      return number * 4;
    }
  };

  const { isLoading: recordIsLoading, error: recordIsError } = useQuery<IRecord[], AxiosError>(
    ['records', userId],
    () => project.getRecords(projectId, userId, start!.toISOString(), end!.toISOString()),
    {
      onSuccess: (record) => {
        setRecords(record);
      },
    }
  );

  const totalHalfDays = records.length;

  const { isLoading: jobIsLoading, error: jobIsError } = useQuery<Job, AxiosError>(
    ['job', job],
    () => jobs.getOne(job),
    {
      onSuccess: (data) => {
        setJobName(data);
      },
    }
  );

  const error = jobIsError || recordIsError;

  if (jobIsLoading || recordIsLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <p>
        An error as occured : {error.message}. code:{error.code}
      </p>
    );
  }

  return (
    <div className="flex items-end justify-between w-full py-2 mt-5 border-b border-gray-500">
      <div className="flex flex-col sm:flex-row sm:items-end items-start">
        <p className="sm:text-xl text-base">
          {firstName} - {lastName}
        </p>
        <p className="sm:text-sm text-xs sm:ml-3 font-thin">/ {jobName?.label}</p>
      </div>
      <p className="text-xs sm:text-base">{totalHalfDays} Demi Journée</p>
      <p>{getTotalHours(weeklyBasis, totalHalfDays)} heures</p>
    </div>
  );
}

export default OneUser;
