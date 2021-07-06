import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { companies } from '../../API/requests';
import AdminJob from './AdminJob';

interface IProps {
  company: Company;
  isFirstElement: boolean;
}

function CompanyPreview({ company, isFirstElement }: IProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);

  const { isLoading, error } = useQuery<User[], AxiosError>(
    ['companies', company.id],
    () => companies.getUsers(company.id, 'ADMIN'),
    {
      onSuccess: (data) => setUser(data[0]),
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-black dark:text-white">An error occurred: {error.message}</p>;
  }

  return (
    <div>
      <Link to={`/clients/${company.id}`} className="group">
        <p
          className={` font-bold text-base py-2 border-b border-black dark:border-white ${
            isFirstElement ? '' : 'font-bold text-sm sm:mt-5'
          } `}
        >
          <span className="font-bold">{company.name}</span>
          <p className="font-thin text-xs mr-2">
            {user ? `${user.role} - ${user.firstName} ${user.lastName}` : 'Aucun admin enregistré'}
            {user?.jobId && ' - '}
            {user?.jobId && <AdminJob jobId={user.jobId} />}
          </p>
        </p>
      </Link>
    </div>
  );
}

export default CompanyPreview;
