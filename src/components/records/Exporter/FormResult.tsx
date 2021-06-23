import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { companies } from '../../../API/requests';

function FormResult({ query }: { query: URLSearchParams }): JSX.Element {
  const [company, setCompany] = useState<Company | null>();
  const companyId = query.get('companyId');
  const { isLoading, error } = useQuery<Company, AxiosError>(
    ['company', companyId],
    () => companies.getOne(companyId),
    {
      onSuccess: (data) => {
        setCompany(data);
      },
    }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <p>
        An error has occured: {error.message}. code:{error.code}
      </p>
    );
  }
  return (
    <div className="bg-black h-full sm:w-full text-white font-roboto rounded-xl shadow-mainShadow mx-4 sm:mx-0  py-5 sm:px-10 p-5">
      <h1>
        {company?.name} / {query.get('projectId')}{' '}
      </h1>
      <h1 className="text-base mb-10">
        Rapport du {new Date(query.get('start') as string).toLocaleDateString()} au{' '}
        {new Date(query.get('end') as string).toLocaleDateString()}{' '}
      </h1>

      <p>Collaborateur/Profession/heuresDéclarés</p>
      <p>Total heures déclarer</p>
      <Link to="/">
        <button className="focus:outline-none mt-5 w-4/12 rounded-sm bg-blue">Retour</button>
      </Link>
    </div>
  );
}

export default FormResult;
