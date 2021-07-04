import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { companies } from '../../API/requests';
import AdminJob from './AdminJob';
import Points from '../../../media/icons/points.svg';
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
    <div className="flex pb-2 flex-row w-full justify-between mt-7 border-b border-black dark:border-white">
      <div className="">
        <p className="text-xl font-bold">{company.name}</p>
        <p className="text-sm mt-1 text-gray-400">
          {user ? `${user.role} - ${user.firstName} ${user.lastName}` : 'Aucun admin enregistré'}
          {user?.jobId && ' - '}
          {user?.jobId && <AdminJob jobId={user.jobId} />}
        </p>
      </div>
      <Menu>
        <div className="relative">
          <Menu.Button className="focus:outline-none">
            <img src={Points} alt="Icône plus" className="ml-4 focus:outline-none" />
          </Menu.Button>
          <Menu.Items className="absolute w-96 h-24 top-6 right-0 z-10 px-4 bg-component shadow-buttonShadow border border-componentBorder  rounded-md">
            <Menu.Item>
              <p className="py-1 border-b mt-2 border-white">Modifier</p>
            </Menu.Item>

            <Menu.Item>
              <p className="py-1 mt-2 border-b border-white">Supprimer</p>
            </Menu.Item>
          </Menu.Items>
        </div>
      </Menu>
    </div>
  );
}

export default CompanyDetails;
