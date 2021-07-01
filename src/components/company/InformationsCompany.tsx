import React, { Dispatch } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { companies } from '../../API/requests';
import Spinner from '../Spinner';

function InformationsCompany(): JSX.Element {
  const { id }: { id: string } = useParams();

  const { isLoading, error, data } = useQuery<Company, AxiosError>(['company', id], () => companies.getOne(id));

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
      <p>Informations</p>
      <div className="flex justify-between">
        <button>Modifier</button>
        <button>Supprimer</button>
      </div>
      <div>
        <p>Admin</p>
      </div>
      <div>Contact</div>
      <p>Status</p>
    </>
  );
}

export default InformationsCompany;
