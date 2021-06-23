import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { companies, project } from '../../../API/requests';
import OneUser from './OneUser';

function FormResult({ query }: { query: URLSearchParams }): JSX.Element {
  const [company, setCompany] = useState<Company>();
  const [prjt, setPrjt] = useState<Project>();
  const [users, setUsers] = useState<IResultUser[]>([]);
  const companyId = query.get('companyId') as string;
  const projectId = query.get('projectId') as string;
  const start = new Date(query.get('start') as string);
  const end = new Date(query.get('end') as string);
  const { isLoading: companyLoading, error: companyError } = useQuery<Company, AxiosError>(
    ['company', companyId],
    () => companies.getOne(companyId),
    {
      onSuccess: (data) => {
        setCompany(data);
      },
    }
  );

  const { isLoading: projectLoading, error: projectError } = useQuery<Project, AxiosError>(
    ['project', projectId],
    () => project.getOne(projectId),
    {
      onSuccess: (data) => {
        setPrjt(data);
      },
    }
  );

  const { isLoading: recordLoading, error: recordError } = useQuery<IResultUser[], AxiosError>(
    'users',
    () => project.getUsers(projectId),
    {
      onSuccess: (data) => {
        setUsers(data);
      },
    }
  );
  const error = companyError || projectError || recordError;

  if (companyLoading || projectLoading || recordLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <p>
        An error has occured: {error.message}. code:{error.code}
      </p>
    );
  }

  return (
    <div className="bg-black h-full sm:w-full text-white font-roboto rounded-xl shadow-mainShadow mx-4 sm:mx-0  py-8 sm:px-10 p-5">
      <div className="flex justify-between items-start">
        <h1 className="sm:text-4xl text-xl">
          {company?.name} / {prjt?.name}{' '}
        </h1>
        <Link to="/">
          <button className="focus:outline-none  w-12/12 py-2 px-5 rounded-sm bg-blue">Retour</button>
        </Link>
      </div>
      <h1 className="text-base sm:text-xl mt-8 sm:mb-10">
        Rapport du {start.toLocaleDateString()} au {end.toLocaleDateString()}
      </h1>

      {users.map((user) => {
        return (
          <div className="text-white flex w-full" key={user.id}>
            <OneUser
              firstName={user.firstName}
              lastName={user.lastName}
              projectId={projectId}
              userId={user.id}
              job={user.jobId}
              start={start}
              end={end}
            />
          </div>
        );
      })}
    </div>
  );
}

export default FormResult;
