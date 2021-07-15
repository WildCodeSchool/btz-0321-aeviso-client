import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

export default function SelectDate({ register }: { register: UseFormRegister<FieldValues> }): JSX.Element {
  return (
    <div>
      <div className="flex flex-col mt-5">
        <label className="mt-5 text-base" htmlFor="select">
          Sélectionner une date de début *
        </label>
        <input
          {...register('start', { required: true })}
          className="focus:outline-none text-black dark:text-gray-300 text-xs bg-white dark:bg-component border-b  pb-2 border-black dark:border-white"
          type="date"
        />
      </div>

      <div className="flex flex-col mt-5">
        <label className="mt-2 text-base" htmlFor="select">
          Sélectionner une date de fin *
        </label>
        <input
          {...register('end', { required: true })}
          className="focus:outline-none text-black dark:text-gray-300 text-xs bg-white dark:bg-component border-b pb-2 border-black dark:border-white"
          type="date"
        />
      </div>
    </div>
  );
}
