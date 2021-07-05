import React from 'react';
import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { project } from '../../API/requests';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';

function DetailsProjects(): JSX.Element {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const { isLoading, error, data } = useQuery<Project, AxiosError>(['projects', id], () => project.getOne(id));

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
    <div className="dark:bg-black bg-white h-full sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-mainShadow mx-4 sm:mx-0 py-6 sm:px-10 p-5">
      <div className="text-white sm:col-start-1 sm:row-start-1 sm:row-end-2 col-start-1 bg-black rounded-xl shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
        <div>
          <div className="flex justify-around p-2 items-center">
            <p className="text-lg">{data?.name}</p>
            <div className=" flex justify-between items-stretch p-2">
              <button onClick={history.goBack} className="border p-2 ml-2 bg-red">
                Retour
              </button>
            </div>
          </div>
          <div className=" flex justify-between items-stretch p-2">
            <p className="text-lg pl-5">Informations</p>
            <button className="border p-2 mr-2 bg-green">Modifier les informations</button>
          </div>
          <p className="text-m pl-5">Total d'heures RD déclarées : </p>
          <div className="p-5 divide-y">
            <p>Statut Juridique : {data?.taxation}</p>
            <p>Description:</p>
            {''}
            <p>{data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsProjects;
