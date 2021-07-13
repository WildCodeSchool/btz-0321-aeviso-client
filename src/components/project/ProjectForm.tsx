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
    <div className="w-6/12">
      <h1 className=" text-2xl font-bold">Créer un nouveau projet</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <label className="mt-5" htmlFor="name">
          Name
          <input className="p-2 mt-2 border border-black" {...register('name')} type="text" />
        </label>
        <label className="mt-5" htmlFor="description">
          Description
          <textarea className="h-28 p-2 mt-2 border border-black" {...register('description')}></textarea>
        </label>
        <label className="mt-5" htmlFor="name">
          code
          <input className="p-2 mt-2 border border-black" {...register('code')} type="text" />
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
        <input className="mt-5 py-1 border border-black" type="submit" value={projectId ? 'Modifier' : 'Créer'} />
      </form>
    </div>
  );
}

export default ProjectForm;
