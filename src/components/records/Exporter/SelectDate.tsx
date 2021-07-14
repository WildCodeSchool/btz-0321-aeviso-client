import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

export default function SelectDate({ register }: { register: UseFormRegister<FieldValues> }): JSX.Element {
  return (
    <div>
      <div className="flex flex-col mt-5">
        <label className="mt-5 text-xl" htmlFor="select">
          <span>{'-> '}</span>
          Sélectionner une date de début
        </label>
        <input
          {...(register('start'), { required: true })}
          className="focus:outline-none text-black dark:text-gray-300 text-sm bg-white dark:bg-component border-b pt-3 pb-2 border-black dark:border-white"
          type="date"
        />
      </div>

      <div className="flex flex-col mt-5">
        <label className="mt-5 text-xl" htmlFor="select">
          <span>{'-> '}</span>
          Sélectionner une date de fin
        </label>
        <input
          {...(register('end'), { required: true })}
          className="focus:outline-none text-black dark:text-gray-300 text-sm bg-white dark:bg-component border-b pt-3 pb-2 border-black dark:border-white"
          type="date"
        />
      </div>
    </div>
  );
}
