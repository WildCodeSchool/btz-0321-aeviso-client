import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { companies, project } from '../../../API/requests';
import OneUser from './OneUser';
import Spinner from '../../Spinner';
import TotalHours from './TotalHours';
import cloud from '../../../../media/icons/cloud.svg';
import { exportToCsv } from '../../../assets/exportToCsv';
import { useStats } from '../../../store/stats.slice';

function FormResult(): JSX.Element {
  const [company, setCompany] = useState<Company>({} as Company);
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [prjt, setPrjt] = useState<Project>({} as Project);
  const [users, setUsers] = useState<IResultUser[]>([]);

  const { users: usersStats } = useStats();

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
    <div className="flex flex-col justify-between dark:bg-component bg-white border dark:border-componentBorder h-full sm:w-full text-black dark:text-white font-roboto rounded-md shadow-buttonShadow dark:shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
      <div>
        <div className="bg-white dark:bg-component shadow-buttonShadow  sm:sticky top-0">
          <div className="flex justify-between items-start mx-4 py-3">
            <div>
              <h1 className="font-bold text-xl mr-5">Entreprise : {company?.name}</h1>
              <h1 className="font-bold mt-2 text-xl mr-5">Projet : {prjt?.name} </h1>
            </div>
            <Link to="/rapport/exporter">
              <button className="focus:outline-none sm:w-full rounded-md mt-8 h-9 text-white shadow-buttonShadow px-4 py-1 mr-3 sm:mr-0 bg-customGreen">
                Retour
              </button>
            </Link>
          </div>
          <div className="flex mt-5 w-full justify-between">
            <h1 className="text-base sm:text-lg mx-4 sm:mx-6 sm:mb-8">
              Rapport du {start && start.toLocaleDateString()} au {end && end.toLocaleDateString()}
            </h1>
            <a
              href={exportToCsv({
                company: company?.name,
                project: prjt?.name,
                start: start?.toLocaleDateString() as string,
                end: end?.toLocaleDateString() as string,
                records: usersStats,
              })}
              download={`${company?.name}_${
                prjt?.name
              }_${start?.toLocaleDateString()}_${end?.toLocaleDateString()}.csv`}
              className="flex text-sm h-8 sm:text-base text-white items-center bg-customBlue px-4 py-1 shadow-buttonShadow rounded-md mx-4 sm:mx-6 w-max"
            >
              Télécharger le rapport <img className="ml-2" src={cloud} alt="cloud" />
            </a>
          </div>
        </div>
        <div className="mb-20">
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
      <div className="shadow-inputShadow sm:sticky bottom-0 ">
        <TotalHours />
      </div>
    </div>
  );
}

export default FormResult;
