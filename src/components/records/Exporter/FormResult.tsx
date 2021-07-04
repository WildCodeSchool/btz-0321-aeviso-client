import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { companies, project } from '../../../API/requests';
import OneUser from './OneUser';
import Spinner from '../../Spinner';

function FormResult(): JSX.Element {
  const [company, setCompany] = useState<Company>({} as Company);
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [prjt, setPrjt] = useState<Project>({} as Project);
  const [users, setUsers] = useState<IResultUser[]>([]);

  const { search } = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(search);

    if (searchParams.get('start') && searchParams.get('end')) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setStart(new Date(searchParams.get('start')!));
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setEnd(new Date(searchParams.get('end')!));
    }
  }, [search]);

  const { companyId, projectId } = useParams<{ companyId: string; projectId: string }>();

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
    return <Spinner />;
  }

  if (error) {
    return (
      <p>
        An error has occucustomRed: {error.message}. code:{error.code}
      </p>
    );
  }

  return (
    <div className="dark:bg-component bg-white border dark:border-componentBorder h-full sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-mainShadow mx-4 sm:mx-0  py-8 sm:px-10 p-5">
      <div className="flex justify-between items-start">
        <h1 className="sm:text-4xl text-xl">
          {company?.name} / {prjt?.name}{' '}
        </h1>
        <Link to="/records/export">
          <button className="focus:outline-none w-12/12 py-1 text-white shadow-buttonShadow px-5 rounded-sm bg-component">
            Retour
          </button>
        </Link>
      </div>
      <h1 className="text-base sm:text-xl mt-8 sm:mb-10">
        Rapport du {start && start.toLocaleDateString()} au {end && end.toLocaleDateString()}
      </h1>

      {users.map((user) => {
        return (
          <div className="dark:text-white text-black flex w-full" key={user.id}>
            <OneUser
              firstName={user.firstName}
              lastName={user.lastName}
              projectId={projectId}
              userId={user.id}
              weeklyBasis={user.weeklyBasis}
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
