import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { project } from '../../API/requests';
import { useUserFromStore } from '../../store/user.slice';
import SelectInput from '../form components/SelectInput';

interface IProps {
  projectId?: string;
}

function ProjectForm({ projectId }: IProps): JSX.Element {
  const { handleSubmit, register, setValue } = useForm();
  const history = useHistory();

  const { user: userStore } = useUserFromStore();

  useQuery<Project>(['projects', projectId], () => project.getOne(projectId as string), {
    enabled: Boolean(projectId),
    onSuccess: (data) => {
      setValue('name', data.name);
      setValue('description', data.description);
      setValue('code', data.code);
      setValue('taxation', data.taxation);
    },
  });

  const { mutate: postProject } = useMutation(project.create, {
    onSuccess: (data) => history.push(`/modifier/projets/${data.id}`),
  });

  const { mutate: updateProject } = useMutation(project.update, {
    onSuccess: (data) => {
      setValue('name', data.name);
      setValue('description', data.description);
      setValue('code', data.code);
      setValue('taxation', data.taxation);
    },
  });

  const onSubmit = (data: IProjectInput) => {
    const { name, description, code, taxation } = data;
    const project = {
      name,
      description,
      companyId: userStore.companyId,
      code,
      taxation,
    };
    if (!projectId) return postProject({ data: project });
    updateProject({ id: projectId, data: project });
  };

  return (
    <div
      className={
        projectId
          ? 'w-full sm:w-9/12 sm:ml-5 mt-5 sm:mt-0 dark:bg-component shadow-mainShadow bg-white rounded-xl p-5 '
          : 'w-full h-full dark:bg-component shadow-mainShadow bg-white rounded-xl p-5 '
      }
    >
      <div className="flex w-full justify-between items-center sm:items-end">
        {projectId ? (
          <h1 className="text-2xl mr-10 sm:mr-0 sm:text-5xl font-bold"> Modifier le projet </h1>
        ) : (
          <h1 className="text-2xl mr-10 sm:mr-0 sm:text-5xl font-bold"> Créer un projet</h1>
        )}
        <button
          onClick={() => history.goBack()}
          className="text-white h-8 sm:h-10 bg-customGreen py-1 px-6 rounded-md shadow-buttonShadow"
        >
          Retour
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-2 sm:mt-2">
        <label className="mt-5 flex flex-col" htmlFor="name">
          Nom
          <input
            className="focus:outline-none mt-1 bg-whiteGray shadow-buttonShadow dark:bg-input text-black dark:text-white rounded-sm py-1 px-2 sm:h-12 sm:rounded-md"
            {...register('name')}
            type="text"
          />
        </label>
        <label className="mt-5 font-bold text-lg flex flex-col" htmlFor="description">
          Description
          <textarea
            className="focus:outline-none mt-1 bg-whiteGray shadow-buttonShadow dark:bg-input text-black dark:text-white rounded-sm py-1 px-2 sm:h-44 sm:rounded-md"
            {...register('description')}
          ></textarea>
        </label>
        <label className="mt-5 flex flex-col" htmlFor="name">
          Code
          <input
            className="focus:outline-none mt-1 bg-whiteGray shadow-buttonShadow dark:bg-input text-black dark:text-white rounded-sm py-1 px-2 sm:h-12 sm:rounded-md"
            {...register('code')}
            type="text"
          />
        </label>
        <SelectInput
          label="Fiscalité"
          items={[
            { text: 'Crédit Impôt Recherche', value: 'CIR' },
            { text: 'Crédit Impôt Innovation', value: 'CII' },
            { text: 'Non Eligible', value: 'NA' },
          ]}
          register={register}
          name="taxation"
        />
        <input
          className="mt-5 w-4/12 py-2 rounded-lg text-white  shadow-buttonShadow bg-customGreen"
          type="submit"
          value={projectId ? 'Modifier' : 'Créer'}
        />
      </form>
    </div>
  );
}

export default ProjectForm;
