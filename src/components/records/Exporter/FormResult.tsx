import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { companies, project } from '../../../API/requests';

function FormResult({ query }: { query: URLSearchParams }): JSX.Element {
  const [company, setCompany] = useState<Company>();
  const [prjt, setPrjt] = useState<Project>();
  const [records, setRecords] = useState<IRecord[]>([]);
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

  const { isLoading: recordLoading, error: recordError } = useQuery<IRecord[], AxiosError>(
    'record',
    () => project.getRecords(projectId, start.toISOString(), end.toISOString()),
    {
      onSuccess: (data) => {
        setRecords(data);
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

  console.log(records);
  return (
    <div className="bg-black h-full sm:w-full text-white font-roboto rounded-xl shadow-mainShadow mx-4 sm:mx-0  py-8 sm:px-10 p-5">
      <div className="flex justify-between items-center">
        <h1 className="sm:text-4xl">
          {company?.name} / {prjt?.name}{' '}
        </h1>
        <Link to="/">
          <button className="focus:outline-none  w-12/12 py-2 px-5 rounded-sm bg-blue">Retour</button>
        </Link>
      </div>
      <h1 className="text-base sm:text-xl mt-5 mb-10">
        Rapport du {start.toLocaleDateString()} au {end.toLocaleDateString()}
      </h1>
    </div>
  );
}

export default FormResult;
