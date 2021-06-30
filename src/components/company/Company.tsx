import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { companies } from '../../API/requests';
import { useForm } from 'react-hook-form';
import Spinner from '../Spinner';
import SearchInput from '../SearchInput';

function Company(): JSX.Element {
  const { id }: { id: string } = useParams();
  const { register, watch } = useForm();

  const searchInput = watch('search');

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
        <div>
          <SearchInput register={register} name="search" />
          {data
            ?.filter((project) => project.name.toLowerCase().includes(searchInput?.toLowerCase()))
            ?.map((project) => (
              <>
                <p key={project.id}>
                  {project.name} / {project.code}
                </p>
                <p className="text-xs">Total demi journées déclarées / </p>
              </>
            ))}
        </div>
      </div>
      <div className="text-white sm:col-start-2 sm:row-start-1 sm:row-end-2 col-start-1 row-start-2 bg-black rounded-xl shadow-mainShadow mx-4 sm:mx-0 overflow-y-auto">
        hola guapo
      </div>
      <div className="text-white sm:col-start-1 sm:col-end-3 sm:row-start-2 sm:row-end-5 row-start-3 row-end-4 col-start-1 bg-black rounded-xl shadow-mainShadow mx-4 sm:mx-0">
        hELLO
      </div>
    </div>
  );
}

export default Company;
