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

  if (isLoading) return <p>Loading ...</p>;

  if (error)
    return (
      <p>
        error : {error.message} {error.code}
      </p>
    );

  return (
    <div className="bg-black h-full sm:w-full text-white font-roboto rounded-xl shadow-mainShadow mx-4 sm:mx-0  py-5 sm:px-10 p-5 overflow-y-auto">
      <h1 className="sm:text-3xl text-white text-2xl font-bold">Liste de tous les clients</h1>
      <div className="flex justify-between items-center">
        <SearchInput register={register} name="search" />
        <div className="flex justify-between items-center">
          <button className="focus:outline-none">Créer Nouveau</button>
          <img src={Plus} alt="Icône plus" className="ml-4" />
        </div>
      </div>

      {data
        ?.filter((company) => company.name.toLowerCase().includes(searchInput?.toLowerCase()))
        ?.map((company) => {
          return <CompanyDetails company={company} key={company.id} />;
        })}
    </div>
  );
}

export default ListsCompanies;
