import React from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { companies } from '../../API/requests';
import AdminJob from './AdminJob';

interface IProps {
  company: Company;
}

function ListsCompanies({ company }: IProps): JSX.Element {
  const { isLoading, error, data } = useQuery<User, AxiosError>(['companies', company.id], () =>
    companies.getAdmin(company.id)
  );

  if (isLoading) return <p>Loading ...</p>;

  if (error)
    return (
      <p>
        error : {error.message} {error.code}
      </p>
    );

  return (
    <div>
      <p>{company.name}</p>
      <div className="flex">
        <p>
          {data ? `${data.role} - ${data.firstName} ${data.lastName}` : 'Aucun admin enregistré'}
          {data?.jobId && ' - '}
          {data?.jobId && <AdminJob jobId={data.jobId} />}
        </p>
      </div>
    </div>
  );
}

export default ListsCompanies;
