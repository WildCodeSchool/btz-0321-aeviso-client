import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { useQuery } from 'react-query';
import { connect } from 'react-redux';
import { companies } from '../../../API/requests';
import { RootState } from '../../../assets/redux/store';
import Spinner from '../../Spinner';

interface ISelectCompany {
  companiesData: Company[] | undefined;
  register: UseFormRegister<FieldValues>;
  user: UserReduxState;
}

function SelectCompany({ companiesData, register, user }: ISelectCompany): JSX.Element {
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

const mapStateToProps = (state: RootState) => {
  return { user: state.userReducer.user };
};

export default connect(mapStateToProps)(SelectCompany);
