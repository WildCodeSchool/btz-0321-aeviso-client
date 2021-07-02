import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { companies } from '../../API/requests';
import Spinner from '../Spinner';

function InformationsCompany(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  const { isLoading, error, data } = useQuery<User[], AxiosError>(['user', id], () => companies.getUsers(id, 'ADMIN'));

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
    <>
      <div className="flex justify-around p-2 items-center">
        <p className="text-lg">Informations Clients</p>
        <div className=" flex justify-between items-stretch p-2">
          <button className="border p-2 mr-2 bg-green">Modifier</button>
          <button className="border p-2 ml-2 bg-red">Supprimer</button>
        </div>
      </div>
      <div>
        {data?.map((data) => (
          <div key={data.id} className="px-10">
            <p className="border-b">Administrateur</p>
            <div className="flex mb-3">
              <p>{data.firstName}</p>
              <p>{data.lastName}</p>
            </div>
            <p className="border-b">Contact</p>
            <a href={`mailto: ${data.email}`}>Envoyer un email: {data.email}</a>
          </div>
        ))}
      </div>
    </>
  );
}

export default InformationsCompany;
