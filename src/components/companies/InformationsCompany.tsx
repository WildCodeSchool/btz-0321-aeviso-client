import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { companies } from '../../API/requests';
import Spinner from '../Spinner';

function InformationsCompany(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  const {
    isLoading,
    error,
    data: usersCompany,
  } = useQuery<User[], AxiosError>(['user', id], () => companies.getUsers(id, 'ADMIN'));

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <p>
        An error has occurred: {error.message}. Code: {error.code}
      </p>
    );
  }

  return (
    <div className="text-black dark:text-white">
      <div className="py-2 px-2 text-lg font-bold flex justify-between items-center bg-white dark:bg-component shadow-inputShadow sm:sticky sm:top-0 ">
        <p className="text-xl mr-2">Informations Clients</p>
      </div>
      <div>
        {usersCompany?.map((data) => (
          <div key={data.id} className="mt-5 mx-4">
            <div className="mb-3 border-b pb-2">
              <p className="font-bold text-base">Administrateur</p>
              <p className="text-sm font-thin">
                {data.firstName} {data.lastName}
              </p>
            </div>
            <div className="border-b pb-2 mt-5">
              <p className="font-bold text-base">Contact</p>
              <a className="text-sm font-thin" href={`mailto: ${data.email}`}>
                Envoyer un email: {data.email}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InformationsCompany;
