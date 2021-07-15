import { AxiosError } from 'axios';
import React from 'react';
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useUserFromStore } from '../../../store/user.slice';
import { companies } from '../../../API/requests';

interface ISelectCompany {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

function SelectCompany({ register, setValue }: ISelectCompany): JSX.Element {
  const { user } = useUserFromStore();

  const { data: companiesData } = useQuery<Company[], AxiosError>('companies', () => companies.getAll(), {
    enabled: user.role === 'SUPERADMIN',
    onSuccess: (data: Company[]) => setValue('company', data[0]),
  });

  return (
    <div className="flex flex-col mt-10">
      <label className="text-xl" htmlFor="select">
        Sélectionner une entreprise *
      </label>
      <select
        {...register('company', { required: true })}
        className="focus:outline-none text-black dark:text-gray-300 text-sm bg-white dark:bg-component border-b pt-3 pb-2 border-black dark:border-white"
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
