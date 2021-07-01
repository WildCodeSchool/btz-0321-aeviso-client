import React from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { companies } from '../../API/requests';

import CardTitle from '../CardTitle';
import { Link } from 'react-router-dom';
import CompanyPreview from './CompanyPreview';
import Spinner from '../Spinner';

function Companies(): JSX.Element {
  const { isLoading, error, data } = useQuery<Company[], AxiosError>('companies', () => companies.getAll(10));

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-black dark:text-white">An error occurred: {error.message}</p>;
  }

  return (
    <div className="text-black dark:text-white">
      <div className="py-5 px-5 text-lg font-bold flex justify-between items-center border-black dark:border-white dark:bg-black bg-white sm:sticky sm:top-0 ">
        <CardTitle>Clients</CardTitle>

        <Link to="/companies" className="p-2 bg-blue rounded-md text-xs font-light">
          Tous les clients
        </Link>
      </div>

      <div className="h-full mx-4">
        {data?.map((company: Company, index) => (
          <CompanyPreview key={company.id} company={company} isFirstElement={index === 0} />
        ))}
      </div>
    </div>
  );
}

export default Companies;
