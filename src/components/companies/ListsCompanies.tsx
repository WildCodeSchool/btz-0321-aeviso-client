import React from 'react';
import SearchInput from '../SearchInput';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { companies } from '../../API/requests';
import { useForm } from 'react-hook-form';
import CompanyDetails from './CompanyDetails';
import Plus from '../../../media/icons/Plus.svg';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';

function ListsCompanies(): JSX.Element {
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
    <div className="dark:bg-component bg-white h-full sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-mainShadow mx-4 sm:mx-0 sm:px-10 px-5 py-8 overflow-y-auto">
      <h1 className="sm:text-4xl text-xl font-bold">Liste de tous les clients</h1>
      <div className="flex flex-col sm:flex-row justify-between mt-5 sm:items-center items-start">
        <SearchInput register={register} name="search" />
        <Link to="/create">
          <p className="focus:outline-none sm:text-base text-xs text-white bg-customBlue px-2 py-1 mt-5 sm:mt-0 sm:p-2 shadow-buttonShadow rounded-md flex items-center">
            Créer Nouveau <img src={Plus} alt="Icône plus" className="ml-2 p-1 rounded-full h-5 w-5 sm:h-6 sm:w-6" />
          </p>
        </Link>
      </div>
      <div className="sm:mt-10 mt-5">
        {data
          ?.filter((company) => company.name.toLowerCase().includes(searchInput?.toLowerCase()))
          ?.map((company) => {
            return <CompanyDetails company={company} key={company.id} />;
          })}
      </div>
    </div>
  );
}

export default ListsCompanies;
