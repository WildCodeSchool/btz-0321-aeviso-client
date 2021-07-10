import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IProps {
  register: UseFormRegister<FieldValues>;
  name: string;
  jobs: Job[];
}

function JobsInput({ register, name, jobs }: IProps): JSX.Element {
  return (
    <label className="flex flex-col mt-3 font-bold">
      {"Fonction de l'administrateur"}
      <select
        {...register(name)}
        className="mt-1 bg-whiteInput shadow-buttonShadow dark:bg-input text-white rounded-sm py-1 px-2 sm:h-12 sm:rounded-md"
      >
        {jobs.map((job: Job) => (
          <option key={job.id} value={job.id}>
            {job.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default JobsInput;
