import React, { useState } from 'react';
import SearchInput from '../SearchInput';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { companies, user } from '../../API/requests';
import { useForm } from 'react-hook-form';
import CompanyDetails from './CompanyDetails';
import CreateCompany from './CreateUpdateCompany';
import Spinner from '../Spinner';

function ListsCompanies(): JSX.Element {
  const [isCreatForm, setIsCreatForm] = useState<boolean>(false);
  const { isLoading, error, data } = useQuery<Company[], AxiosError>('companies', () => companies.getAll());
  const { register, watch } = useForm();

  const searchInput = watch('search');

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-black dark:text-white">An error occurred: {error.message}</p>;
  }

  return (
    <div className="dark:bg-component h-full bg-white sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-buttonShadow dark:shadow-mainShadow mx-4 sm:mx-0  overflow-y-auto">
      {isCreatForm ? (
        <CreateCompany
          mutationFn={companies.post}
          mutationUs={user.create}
          isCreatForm={isCreatForm}
          setIsCreatForm={setIsCreatForm}
        />
      ) : (
        <div className="">
          <div className="flex flex-col justify-between mb-5 sm:items-center items-start bg-white dark:bg-component shadow-inputShadow px-3 py-5 sm:sticky top-0">
            <div className="flex w-full justify-between mb-2">
              <h1 className="sm:text-2xl text-xl font-bold">Liste de tous les clients</h1>

              <button
                onClick={() => setIsCreatForm(true)}
                className="focus:outline-none w-28 h-8 sm:text-sm text-xs text-white bg-customBlue px-2 py-1 mt-5 sm:mt-0 sm:p-2 shadow-buttonShadow rounded-md flex justify-center items-center"
              >
                Nouveau
              </button>
            </div>
            <SearchInput register={register} name="search" />
          </div>
          <div className="mt-5 mx-4">
            {data
              ?.filter((company) => {
                const included = company.name.toLowerCase().includes(searchInput?.toLowerCase());
                return searchInput ? included : true;
              })
              .map((company) => {
                return <CompanyDetails company={company} key={company.id} />;
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ListsCompanies;
