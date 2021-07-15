import React, { useState } from 'react';
import SearchInput from '../SearchInput';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { companies, user } from '../../API/requests';
import { useForm } from 'react-hook-form';
import CompanyDetails from './CompanyDetails';
import Plus from '../../../media/icons/Plus.svg';
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
    <div className="dark:bg-component bg-white sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-buttonShadow dark:shadow-mainShadow mx-4 sm:mx-0  overflow-y-auto">
      {isCreatForm ? (
        <CreateCompany
          mutationFn={companies.post}
          mutationUs={user.create}
          isCreatForm={isCreatForm}
          setIsCreatForm={setIsCreatForm}
        />
      ) : (
        <div className="sm:p-10 p-5">
          <div className="flex flex-col sm:flex-row justify-between mb-5 sm:items-center items-start">
            <h1 className="sm:text-4xl text-xl font-bold">Liste de tous les clients</h1>

            <button
              onClick={() => setIsCreatForm(true)}
              className="focus:outline-none  sm:text-base text-xs text-white bg-customBlue px-2 py-1 mt-5 sm:mt-0 sm:p-2 shadow-buttonShadow rounded-md flex items-center"
            >
              Créer Nouveau <img src={Plus} alt="Icône plus" className="p-1 rounded-full h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
          <SearchInput register={register} name="search" />
          <div className="sm:mt-10 mt-5">
            {searchInput
              ? data?.filter((company) => company.name.toLowerCase().includes(searchInput?.toLowerCase()))
              : data?.map((company) => {
                  return <CompanyDetails company={company} key={company.id} />;
                })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ListsCompanies;
