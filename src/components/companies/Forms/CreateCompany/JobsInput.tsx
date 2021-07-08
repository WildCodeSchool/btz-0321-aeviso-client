import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IProps {
  register: UseFormRegister<FieldValues>;
  name: string;
  jobs: Job[];
}

function JobsInput({ register, name, jobs }: IProps): JSX.Element {
  return (
    <label className="mb-6 sm:mb-0 flex flex-col">
      {"Fonction de l'administrateur"}
      <select {...register(name)} className="text-black">
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
