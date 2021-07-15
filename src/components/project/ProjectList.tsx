import { AxiosError } from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { companies } from '../../API/requests';
import { useUserFromStore } from '../../store/user.slice';
import Spinner from '../Spinner';
import Plus from '../../../media/icons/Plus.svg';
import { Link, useHistory } from 'react-router-dom';

function ProjectList(): JSX.Element {
  const { user } = useUserFromStore();

  const history = useHistory();
  const companyId = user.companyId;
  const { isLoading, error, data } = useQuery<Project[], AxiosError>(['project', companyId], () =>
    companies.getAllProjects(companyId as string)
  );

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <p className="text-black dark:text-white">An error occurred: {error.message}</p>;
  }

  return (
    <div className="dark:bg-component bg-white h-full sm:w-full text-black dark:text-white font-roboto rounded-lg shadow-mainShadow  sm:mx-0 sm:px-0  overflow-y-auto">
      <div className="flex flex-col sm:flex-row p-5 justify-between bg-white dark:bg-component shadow-buttonShadow dark:shadow-mainShadow sm:items-center items-start sm:sticky top-0">
        <h1 className="sm:text-xl text-2xl font-bold">Projets</h1>
        <button
          className="focus:outline-none sm:text-xs text-xs text-white bg-customBlue px-2 mt-5 sm:mt-0 sm:py-1 shadow-buttonShadow rounded-md flex items-center"
          onClick={() => history.push('/nouveau/projet')}
        >
          Créer Nouveau <img src={Plus} alt="Icône plus" className="p-1 rounded-full h-5 w-5 sm:h-5 sm:w-5" />
        </button>
      </div>
      <div className="mt-5 mx-4 sm:mx-5">
        {data?.map((project) => {
          return (
            <div key={project.id} className="mt-5">
              <Link to={`/projets/${project.id}`}>
                <div className="w-full border-b border-gray-500 pb-2">
                  <p className="font-bold text-sm">{project.name}</p>
                  <p className="truncate text-xs w-56 text-gray-400 sm:w-96">{project.description}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectList;
