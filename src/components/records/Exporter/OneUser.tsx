import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { jobs, project } from '../../../API/requests';
import { useStats } from '../../../store/stats.slice';
import Spinner from '../../Spinner';

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

function OneUser({ firstName, lastName, projectId, userId, job, start, end, weeklyBasis }: IOneUser): JSX.Element {
  const [jobName, setJobName] = useState<Job>();
  const [records, setRecords] = useState<IRecord[]>([]);

  const getTotalHours = (basis: 'h35' | 'h39', number: number): number => {
    return basis === 'h35' ? number * 3.5 : number * 4;
  };

  const { dispatchAddUser } = useStats();

  const { isLoading: recordIsLoading, error: recordIsError } = useQuery<IRecord[], AxiosError>(
    ['records', userId],
    () => project.getRecords(projectId, userId, start?.toISOString() as string, end?.toISOString() as string),
    {
      onSuccess: (record) => {
        setRecords(record);
        dispatchAddUser({ name: `${firstName} ${lastName}`, total: getTotalHours(weeklyBasis, record.length) });
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
    return <Spinner />;
  }

  if (error) {
    return (
      <p>
        An error as occurred : {error.message}. code:{error.code}
      </p>
    );
  }

  return (
    <div className="flex items-end mt-5 justify-between w-full py-2 border-b border-gray-500">
      <div className="flex flex-col sm:flex-row sm:items-end items-start">
        <p className="sm:text-xl text-base">
          {firstName} - {lastName}
        </p>
        <p className="sm:text-sm text-xs sm:ml-3 font-thin">/ {jobName?.label}</p>
      </div>
      <p>{getTotalHours(weeklyBasis, totalHalfDays)} heures</p>
    </div>
  );
}
export default OneUser;
