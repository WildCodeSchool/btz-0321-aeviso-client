import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { project } from '../../API/requests';
import Spinner from '../Spinner';
import InformationsCompany from './InformationsCompany';

function DetailsProjects(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  const { isLoading, error, data } = useQuery<Project, AxiosError>(['projects', id], () => project.getOne(id));
  console.log(data);
  console.log();

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
    <div className="grid sm:grid-cols-2  grid-cols-1 grid-rows-2 gap-5 h-full w-full">
      <div className="text-white sm:col-start-1 sm:row-start-1 sm:row-end-2 col-start-1 bg-black rounded-xl shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
        <div>
          <div className="flex justify-around p-2 items-center">
            <p className="text-lg">{data?.name}</p>
            <div className=" flex justify-between items-stretch p-2">
              <button className="border p-2 mr-2 bg-green">Modifier</button>
              <button className="border p-2 ml-2 bg-red">Supprimer</button>
            </div>
          </div>
          <p className="text-lg pl-5">Informations</p>
          <div className="p-5 divide-y">
            <p>Statut Juridique : {data?.taxation}</p>
            <p>Description:</p>
            {''}
            <p>{data?.description}</p>
          </div>
        </div>
      </div>
      <div className="text-white sm:col-start-2 sm:row-start-1 sm:row-end-2 col-start-1 row-start-2 bg-black rounded-xl shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
        <InformationsCompany />
      </div>
      <div className="text-white sm:col-start-1 sm:col-end-3 sm:row-start-2 sm:row-end-5 row-start-3 row-end-4 col-start-1 bg-black rounded-xl shadow-mainShadow mx-4 sm:mx-0">
        HELLO
      </div>
    </div>
  );
}

export default DetailsProjects;
