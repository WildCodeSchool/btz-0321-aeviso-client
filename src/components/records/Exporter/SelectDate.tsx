import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

export default function SelectDate({ register }: { register: UseFormRegister<FieldValues> }): JSX.Element {
  return (
    <div>
      <div className="flex flex-col mt-5">
        <label className="mt-5 text-xl" htmlFor="select">
          3. Sélectionner une date de début
        </label>
        <input
          {...register('start')}
          className="focus:outline-none text-black dark:text-gray-300 text-sm bg-white dark:bg-black border-b pt-3 pb-2 border-black dark:border-white"
          type="date"
        />
      </div>

      <div className="flex flex-col mt-5">
        {' '}
        <label className="mt-5 text-xl" htmlFor="select">
          4. Sélectionner une date de fin
        </label>
        <input
          {...register('end')}
          className="focus:outline-none text-black dark:text-gray-300 text-sm bg-white dark:bg-black border-b pt-3 pb-2 border-black dark:border-white"
          type="date"
        />
        <input
          value="Exporter"
          type="submit"
          className="focus:outline-none text-white shadow-buttonShadow mt-10 w-4/12 py-2 rounded-lg bg-green "
        />
      </div>
    </div>
  );
}
