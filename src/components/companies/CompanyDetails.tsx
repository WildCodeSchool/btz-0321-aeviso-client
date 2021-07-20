import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { companies } from '../../API/requests';
import AdminJob from './AdminJob';
import { Link } from 'react-router-dom';

interface IProps {
  company: Company;
}

function CompanyDetails({ company }: IProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);

  const { isLoading, error } = useQuery<User[], AxiosError>(
    ['companies', company.id],
    () => companies.getUsers(company.id, 'ADMIN'),
    {
      onSuccess: (data) => setUser(data[0]),
    }
  );

  if (isLoading) {
    return <p>...</p>;
  }

  if (error) {
    return <p className="text-black dark:text-white">An error occurred: {error.message}</p>;
  }

  return (
    <div>
      <div className="text-black dark:text-white flex justify-between mt-6 border-b pb-2 border-gray-400">
        <Link to={`/clients/${company.id}`}>
          <p className="font-bold">{company.name}</p>
          <p className="font-thin text-sm mt-1 mr-2">
            {user ? `${user.role} - ${user.firstName} ${user.lastName}` : 'Aucun admin enregistré'}
            {user?.jobId && ' - '}
            {user?.jobId && <AdminJob jobId={user.jobId} />}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default CompanyDetails;
