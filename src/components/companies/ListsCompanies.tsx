import React from 'react';
import SearchInput from '../SearchInput';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { companies } from '../../API/requests';
import { useForm } from 'react-hook-form';
import CompanyDetails from './CompanyDetails';
import Plus from '../../../media/icons/Plus.svg';

function ListsCompanies(): JSX.Element {
  const { isLoading, error, data } = useQuery<Company[], AxiosError>('companies', () => companies.getAll());
  const { register, watch } = useForm();

  const searchInput = watch('search');

  const handleClick = () => {
    console.log('je clique');
  };

  if (isLoading) return <p>Loading ...</p>;

  if (error)
    return (
      <p>
        error : {error.message} {error.code}
      </p>
    );

  return (
    <div className="dark:bg-black bg-white h-full sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-mainShadow mx-4 sm:mx-0 sm:px-10 px-5 py-8 overflow-y-auto">
      <h1 className="sm:text-4xl text-xl font-bold">Liste de tous les clients</h1>
      <div className="flex justify-between mt-5 items-center">
        <SearchInput register={register} name="search" />
        <button className="focus:outline-none flex items-center" onClick={handleClick}>
          Créer Nouveau <img src={Plus} alt="Icône plus" className="ml-2 bg-black p-1 rounded-full h-6 w-6" />
        </button>
      </div>
      <div className="mt-10">
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
