import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Button from '../../../formComponents/Button';

interface IProps {
  register: UseFormRegister<FieldValues>;
  name: string;
  jobs: Job[];
}

function JobsInput({ register, name, jobs }: IProps): JSX.Element {
  const history = useHistory();
  return (
    <div className="sm:flex w-full sm:items-end">
      <label className="flex flex-col mt-3 font-bold sm:w-3/4">
        {"Fonction de l'administrateur"}
        <select
          {...register(name)}
          className="mt-1 dark:bg-input shadow-buttonShadow bg-whiteGray text-black dark:text-white rounded-sm py-1 px-2 sm:h-10 sm:rounded-md"
        >
          {jobs.map((job: Job) => (
            <option key={job.id} value={job.id}>
              {job.label}
            </option>
          ))}
        </select>
      </label>
      <Button color="green" handleClick={() => history.push('/fonctions')}>
        Tout voir
      </Button>
    </div>
  );
}

export default JobsInput;
