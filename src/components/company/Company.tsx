import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { companies } from '../../API/requests';
import { useForm } from 'react-hook-form';
import Spinner from '../Spinner';
import InformationsCompany from './InformationsCompany';
import ProjectsCieAdmin from './ProjectsCieAdmin';

function Company(): JSX.Element {
  const { id }: { id: string } = useParams();

  const { isLoading, error, data } = useQuery<Project[], AxiosError>(['projects', { companyId: id }], () =>
    companies.getAllProjects(id)
  );

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
        Projets
        <ProjectsCieAdmin />
      </div>
      <div className="text-white sm:col-start-2 sm:row-start-1 sm:row-end-2 col-start-1 row-start-2 bg-black rounded-xl shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
        <div>
          <InformationsCompany />
          {data?.map((data) => (
            <p key={data.id}>{data.taxation}</p>
          ))}
        </div>
      </div>
      <div className="text-white sm:col-start-1 sm:col-end-3 sm:row-start-2 sm:row-end-5 row-start-3 row-end-4 col-start-1 bg-black rounded-xl shadow-mainShadow mx-4 sm:mx-0">
        HELLO
      </div>
    </div>
  );
}

export default Company;
