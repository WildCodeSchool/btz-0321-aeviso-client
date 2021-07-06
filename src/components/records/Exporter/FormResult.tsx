import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { companies, project } from '../../../API/requests';
import OneUser from './OneUser';
import Spinner from '../../Spinner';
import TotalHours from './TotalHours';
import cloud from '../../../../media/icons/cloud.svg';

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
        An error has occurred: {error.message}. code:{error.code}
      </p>
    );
  }

  return (
    <div className="flex flex-col justify-between dark:bg-component bg-white border dark:border-componentBorder h-full sm:w-full text-black dark:text-white font-roboto rounded-lg shadow-mainShadow mx-4 sm:mx-0">
      <div>
        <div className="flex justify-between items-start mx-4 mt-5">
          <h1 className="sm:text-4xl text-xl mr-5">
            {company?.name} / {prjt?.name}{' '}
          </h1>
          <Link to="/records/export">
            <button className="focus:outline-none w-12/12 py-1 bg-customGreen text-white shadow-buttonShadow px-5 rounded-sm ">
              Retour
            </button>
          </Link>
        </div>
        <div className="mt-10">
          <h1 className="text-base sm:text-xl mx-4 sm:mx-6 sm:mb-10">
            Rapport du {start && start.toLocaleDateString()} au {end && end.toLocaleDateString()}
          </h1>

          {users.map((user) => {
            return (
              <div className="dark:text-white text-black mx-4 sm:mx-6 flex " key={user.id}>
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
      </div>
      <div>
        <button className="flex text-sm sm:text-base text-white items-center bg-customBlue px-4 py-1 shadow-buttonShadow rounded-lg mx-4 sm:mx-6">
          télécharger le rapport <img className="ml-2" src={cloud} alt="cloud" />
        </button>
        <TotalHours />
      </div>
    </div>
  );
}

export default FormResult;
