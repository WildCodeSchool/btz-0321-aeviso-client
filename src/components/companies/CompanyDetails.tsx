import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { companies } from '../../API/requests';
import AdminJob from './AdminJob';

interface IProps {
  company: Company;
}

function ListsCompanies({ company }: IProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);

  const { isLoading, error } = useQuery<User[], AxiosError>(
    ['companies', company.id],
    () => companies.getUsers(company.id, 'ADMIN'),
    {
      onSuccess: (data) => setUser(data[0]),
    }
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
          {user ? `${user.role} - ${user.firstName} ${user.lastName}` : 'Aucun admin enregistré'}
          {user?.jobId && ' - '}
          {user?.jobId && <AdminJob jobId={user.jobId} />}
        </p>
      </div>
    </div>
  );
}

export default ListsCompanies;
