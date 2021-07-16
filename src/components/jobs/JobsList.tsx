import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { jobs } from '../../API/requests';
import Button from '../formComponents/Button';
import JobsHeader from './JobsHeader';

function JobsList(): JSX.Element {
  const [isModifying, setIsModifying] = useState('');

  const { refetch, data } = useQuery<Job[], AxiosError>('jobs', jobs.getAll);

  const { mutate: deleteJob } = useMutation(jobs.delete, { onSuccess: () => refetch() });

  const { mutate: modifyJob } = useMutation(jobs.update, {
    onSuccess: () => {
      setIsModifying('');
      refetch();
    },
  });
  //createJob
  const { mutate: createJob } = useMutation(jobs.create, {
    onSuccess: () => {
      refetch();
    },
  });

  const { register, getValues, setValue } = useForm();

  return (
    <div className="dark:bg-component bg-white border-2 dark:border-componentBorder h-full w-full sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-buttonShadow dark:shadow-mainShadow sm:mx-0 overflow-y-auto relative">
      <JobsHeader />
      <div className="p-5 sm:flex justify-between">
        <ul className="sm:w-2/5">
          {data &&
            data.map((job) => {
              if (isModifying !== job.id) {
                return (
                  <li key={job.id} className="flex sm:w-full items-end justify-between">
                    <button
                      className="text-l sm:text-xl focus:outline-none overflow-hidden overflow-ellipsis whitespace-nowrap"
                      onClick={() => {
                        setValue('job', job.label);
                        setIsModifying(job.id);
                      }}
                    >
                      {job.label}
                    </button>
                    <Button handleClick={() => deleteJob({ id: job.id })} color="red">
                      Supprimer
                    </Button>
                  </li>
                );
              }

              if (isModifying === job.id) {
                return (
                  <li key={job.id} className="flex sm:w-full items-end justify-between">
                    <input
                      className="focus:outline-none mt-1 bg-whiteGray shadow-buttonShadow dark:bg-input text-white rounded-sm py-1 px-2 sm:h-12 sm:rounded-md w-full"
                      {...register('job')}
                    />
                    <Button
                      handleClick={() => modifyJob({ id: job.id, data: { label: getValues('job') } })}
                      color="green"
                    >
                      Modifier
                    </Button>
                  </li>
                );
              }
            })}
        </ul>
        <div className="flex flex-col items-center justify-center min-h-full sm:w-2/5">
          <label className="flex flex-col mt-3 sm:mt-4 w-full sm:w-3/4">
            Créer nouveau job :
            <input
              className="focus:outline-none mt-1 bg-whiteGray shadow-buttonShadow dark:bg-input text-white rounded-sm py-1 px-2 sm:h-12 sm:rounded-md w-full"
              {...register('newJob')}
            />
          </label>
          <Button
            handleClick={() => {
              createJob({ label: getValues('newJob') });
            }}
            color="green"
          >
            Créer nouveau
          </Button>
        </div>
      </div>
    </div>
  );
}

export default JobsList;
