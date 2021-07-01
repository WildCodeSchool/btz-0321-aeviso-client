import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface ISelectCompany {
  companiesData: Company[] | undefined;
  register: UseFormRegister<FieldValues>;
}

function SelectCompany({ companiesData, register }: ISelectCompany): JSX.Element {
  return (
    <div className="flex flex-col mt-5">
      <label className="text-xl" htmlFor="select">
        1. Sélectionner une entreprise
      </label>
      <select
        {...register('company')}
        className="focus:outline-none text-gray-300 text-sm bg-black border-b pt-3 pb-2 border-white"
      >
        {companiesData?.map((company: Company) => {
          return (
            <option value={company.id} key={company.id}>
              {company.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectCompany;
