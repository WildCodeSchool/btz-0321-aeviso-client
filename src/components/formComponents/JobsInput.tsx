import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { FieldValues, useForm, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { jobs } from '../../API/requests';
import Button from './Button';
import SelectInput from './SelectInput';

interface IProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

function JobsInput({ register, setValue }: IProps): JSX.Element {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [listOfJobs, setListOfJobs] = useState<SelectItem[]>([]);

  const { refetch } = useQuery<Job[], AxiosError>('jobs', () => jobs.getAll(), {
    onSuccess: (data) =>
      setListOfJobs(
        data.map((job) => {
          return { value: job.id, text: job.label };
        })
      ),
  });

  const { mutate } = useMutation(jobs.create, {
    onSuccess: (data) => {
      refetch();
      setValue('jobId', data.id);
      setIsActive(false);
    },
  });

  const { register: newJobRegister, getValues } = useForm();

  return (
    <div className="flex flex-col w-full mb-5">
      {!isActive && (
        <>
          <div className="w-full md:w-3/4">
            <SelectInput label="Fonction :" name="jobId" register={register} items={listOfJobs} />
          </div>
          <button className="underline mt-2 focus:outline-none text-left" onClick={() => setIsActive(true)}>
            Cliquez pour créer un nouveau poste
          </button>
        </>
      )}

      {isActive && (
        <>
          <label className="flex flex-col mt-3 sm:mt-4 w-full sm:w-3/4">
            Fonction :
            <input
              className="focus:outline-none mt-1 bg-whiteGray shadow-buttonShadow dark:bg-input text-white rounded-sm py-1 px-2 sm:h-12 sm:rounded-md w-full"
              {...newJobRegister('label')}
            />
          </label>
          <div className="w-full flex justify-between">
            <Button
              handleClick={() => {
                mutate({ label: getValues('label') });
              }}
              color="green"
            >
              Créer nouveau
            </Button>
            <Button handleClick={() => setIsActive(false)} color="red">
              Annuler
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default JobsInput;
