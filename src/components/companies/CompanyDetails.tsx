import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { companies } from '../../API/requests';
import AdminJob from './AdminJob';
import Plus from '../../../media/icons/Plus.svg';
import { Menu } from '@headlessui/react';

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
      <div className="flex justify-between bg-red-300">
        <p>
          {user ? `${user.role} - ${user.firstName} ${user.lastName}` : 'Aucun admin enregistré'}
          {user?.jobId && ' - '}
          {user?.jobId && <AdminJob jobId={user.jobId} />}
        </p>

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
