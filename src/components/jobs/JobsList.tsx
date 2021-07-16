import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { jobs } from '../../API/requests';
import Button from '../formComponents/Button';

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

  const { register, getValues, setValue } = useForm();

  return (
    <div className="dark:bg-component bg-white border-2 dark:border-componentBorder h-full w-full sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-buttonShadow dark:shadow-mainShadow  sm:mx-0  sm:px-5 p-5 overflow-y-auto">
      <ul className="sm:w-2/5">
        {data &&
          data.map((job) => {
            if (isModifying !== job.id) {
              return (
                <li key={job.id} className="flex sm:w-full items-end justify-between">
                  <button
                    className="text-xl focus:outline-none"
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
    </div>
  );
}

export default JobsList;
