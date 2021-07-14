import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { companies } from '../../API/requests';
import AdminJob from './AdminJob';
import { Menu } from '@headlessui/react';
import { Link } from 'react-router-dom';
import more from '../../../media/icons/more.svg';

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
      <div className="text-black dark:text-white flex justify-between mt-6 border-b border-gray-400">
        <Link to={`/clients/${company.id}`}>
          <p className="font-bold text-base">{company.name}</p>
          <p className="font-thin text-xs mr-2">
            {user ? `${user.role} - ${user.firstName} ${user.lastName}` : 'Aucun admin enregistré'}
            {user?.jobId && ' - '}
            {user?.jobId && <AdminJob jobId={user.jobId} />}
          </p>
        </Link>
        <Menu>
          <div className="">
            <Menu.Button className="focus:outline-none">
              <img src={more} alt="more" />
            </Menu.Button>
            <Menu.Items className="absolute right-10 sm:right-28 flex flex-col justify-center w-72 shadow-buttonShadow px-2 py-4 text-black dark:text-white z-10  bg-whiteGray dark:bg-mainBg rounded-md">
              <Menu.Item>
                <p className=" border-b px-4 border-gray-400">Modifier</p>
              </Menu.Item>

              <Menu.Item>
                <p className="pt-4 border-b border-gray-400 px-4">Supprimer</p>
              </Menu.Item>
            </Menu.Items>
          </div>
        </Menu>
      </div>
    </div>
  );
}

export default CompanyDetails;
