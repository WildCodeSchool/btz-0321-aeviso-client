import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import UpdateCompany from './UpdateCompany';
import { companies } from '../../API/requests';
import DeleteCompany from './DeleteCompany';

function Company(): JSX.Element {
  const { id }: { id: string } = useParams();

  const [company, setCompany] = useState<Company | null>();

  const { isLoading, error } = useQuery<Company, AxiosError>(['company', id], () => companies.getOne(id), {
    onSuccess: (data) => {
      setCompany(data);
    },
    staleTime: Infinity,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <p>
        An error has occurred: {error.message}. Code: {error.code}
      </p>
    );
  }

  return (
    <div>
      {company && (
        <>
          <h3 className="mb-6">Test User</h3>
          <div className="border border-black mb-2">
            <p>{company?.id}</p>
            <p>{company?.name}</p>
            <p>{company?.zipCode}</p>
            <p>{company?.city}</p>
          </div>
          <UpdateCompany setCompany={setCompany} />
          <DeleteCompany />
        </>
      )}
    </div>
  );
}

export default Company;
