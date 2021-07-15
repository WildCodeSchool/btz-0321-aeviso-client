import { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { useQuery } from 'react-query';
import { companies } from '../../../API/requests';

interface ISelectProject {
  companyId?: string;
  register: UseFormRegister<FieldValues>;
}

function SelectProject({ register, companyId }: ISelectProject): JSX.Element {
  const { refetch, data: projectData } = useQuery<Project[], AxiosError>(
    'project',
    () => companies.getAllProjects(companyId as string),
    {
      enabled: Boolean(companyId),
    }
  );

  useEffect(() => {
    if (companyId) {
      refetch();
    }
  }, [companyId]);

  return (
    <div className="flex flex-col">
      <label className="mt-5 text-base" htmlFor="select">
        Sélectionner un projet
      </label>
      <select
        {...register('project', { required: true })}
        className="focus:outline-none text-black dark:text-gray-300 text-xs bg-white dark:bg-component border-b pt-1 pb-2 border-black dark:border-white"
      >
        {projectData?.map((project) => {
          return (
            <option value={project.id} key={project.id}>
              {project.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectProject;
