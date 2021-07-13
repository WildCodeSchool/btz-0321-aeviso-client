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

  // const { isLoading: projectLoading, error: projectError } = useQuery<Project[]>('projects', project.getAll, {
  //   onSuccess: (data) => setListProject(data),
  // })
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
    <div className="dark:bg-component bg-white h-full sm:w-full text-black dark:text-white font-roboto rounded-xl shadow-mainShadow mx-4 sm:mx-0 sm:px-10 px-5 py-5 overflow-y-auto">
      <div className="flex flex-col sm:flex-row justify-between mt-5 sm:items-center items-start">
        <h1 className="sm:text-4xl text-2xl font-bold">Liste de tous les Projets</h1>
        <button
          className="focus:outline-none sm:text-base text-xs text-white bg-customBlue px-2 py-1 mt-5 sm:mt-0 sm:p-2 shadow-buttonShadow rounded-md flex items-center"
          onClick={() => history.push('/projets/creer')}
        >
          Créer Nouveau <img src={Plus} alt="Icône plus" className="p-1 rounded-full h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>
      <div className="sm:mt-10 mt-5">
        {data?.map((project) => {
          return (
            <div key={project.id} className="mt-7">
              <Link to={`/projets/${project.id}`}>
                <div className="w-full border-b border-gray-500 pb-2">
                  <p className="font-bold text-xl">{project.name}</p>
                  <p className="truncate w-56 text-gray-400 sm:w-96">{project.description}</p>
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
