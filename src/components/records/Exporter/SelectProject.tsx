import React from 'react';
import { FieldValues } from 'react-hook-form';

interface ISelectProject {
  projectData: Project[] | undefined;
  register: FieldValues | any;
}

function SelectProject({ projectData, register }: ISelectProject): JSX.Element {
  return (
    <div className="flex flex-col mt-5">
      {' '}
      <label className="mt-5 text-xl" htmlFor="select">
        2. Sélectionner une projet
      </label>
      <select
        {...register('project', { value: projectData?.[0]?.id || '' })}
        className="focus:outline-none text-gray-300 text-sm bg-black border-b pt-3 pb-2 border-white"
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
