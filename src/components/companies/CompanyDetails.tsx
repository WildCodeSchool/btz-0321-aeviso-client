import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { companies } from '../../API/requests';
import AdminJob from './AdminJob';
import Plus from '../../../media/icons/Plus.svg';
import { Menu } from '@headlessui/react';
import Spinner from '../Spinner';
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
    return <Spinner />;
  }

  if (error) {
    return <p className="text-black dark:text-white">An error occurred: {error.message}</p>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <Link to={`/clients/${company.id}`}>
          <p>{company.name}</p>
          <p>
            {user ? `${user.role} - ${user.firstName} ${user.lastName}` : 'Aucun admin enregistré'}
            {user?.jobId && ' - '}
            {user?.jobId && <AdminJob jobId={user.jobId} />}
          </p>
        </Link>
        <Menu>
          <div className="relative">
            <Menu.Button>
              <img src={Plus} alt="Icône plus" className="ml-4" />
            </Menu.Button>
            <Menu.Items className="absolute top-6 right-0 z-10 px-8 bg-gray-600 rounded-md">
              <Menu.Item>
                <p className="py-2">Modifier</p>
              </Menu.Item>

              <Menu.Item>
                <p className="py-2">Supprimer</p>
              </Menu.Item>
            </Menu.Items>
          </div>
        </Menu>
      </div>
    </div>
  );
}

export default CompanyDetails;
