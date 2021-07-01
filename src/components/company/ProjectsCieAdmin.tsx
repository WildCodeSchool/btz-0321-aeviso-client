import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { companies } from '../../API/requests';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import Spinner from '../Spinner';
import SearchInput from '../SearchInput';

function ProjectsCieAdmin(): JSX.Element {
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
    <div>
      <SearchInput register={register} name="search" />
      {data
        ?.filter((project) => project.name.toLowerCase().includes(searchInput?.toLowerCase()))
        ?.map((project) => (
          <div key={project.id}>
            <Link to={`/companies/${id}/projects/${project.id}`}>
              <p key={project.id}>
                {project.name} / {project.code}
              </p>
              <p className="text-xs">Total demi journées déclarées / </p>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default ProjectsCieAdmin;
