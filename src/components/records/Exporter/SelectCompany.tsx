import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useUserFromStore } from '../../../store/user.slice';
import { companies } from '../../../API/requests';

import Spinner from '../../Spinner';

interface ISelectCompany {
  companiesData: Company[] | undefined;
  register: UseFormRegister<FieldValues>;
}

function SelectCompany({ companiesData, register }: ISelectCompany): JSX.Element {
  const { user } = useUserFromStore();
  const userCompanyId = user.companyId;

  const [userCompany, setUserCompany] = useState<Company | null>(null);

  const { isLoading, error } = useQuery<Company, AxiosError>(
    ['company', userCompanyId],
    () => companies.getOne(userCompanyId as string),
    {
      onSuccess: (data) => {
        setUserCompany(data);
      },
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <p>
        An error has occurred: {error.message}. Code: {error.code}
      </p>
    );
  }

  if (user.role === 'ADMIN') {
    return (
      <div className="mt-5 border-b border-black">
        <h1 className="text-xl dark:text-white">1. Mon entreprise</h1>
        <h1 className="mt-2">{userCompany?.name}</h1>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col mt-2">
        <label className="text-xl" htmlFor="select">
          1. Sélectionner une entreprise
        </label>
        <select
          {...register('company')}
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
}

export default SelectCompany;
