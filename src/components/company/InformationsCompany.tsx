import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { companies } from '../../API/requests';
import Spinner from '../Spinner';

function InformationsCompany(): JSX.Element {
  const { id }: { id: string } = useParams();

  const { isLoading, error, data } = useQuery<User[], AxiosError>(['user', id], () => companies.getUsers(id, 'ADMIN'));
  console.log(data);
  console.log(id);

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
          <>
            <p key={data.id}>{data.firstName}</p>
            <p>Contact</p>
            <p>{data.email}</p>
          </>
        ))}
      </div>
    </>
  );
}

export default InformationsCompany;
