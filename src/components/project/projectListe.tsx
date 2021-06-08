import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { Link, useHistory } from 'react-router-dom';
import { project } from '../../API/requests';

function ProjectList() {
  const { register, handleSubmit } = useForm<Project>();
  const history = useHistory();
  const { isLoading: projectLoading, error: projectError, data } = useQuery<Project[]>('projects', project.getAll);
  const { isLoading: postLoading, error: postError, mutate } = useMutation(project.post, { onSuccess: () => history.push('/projects') });

  const loading = projectLoading || postLoading;
  const error = postError || projectError;

  if (loading) {
    return <p>IsLoading...</p>;
  } else if (error) {
    return <h1>Error Sorry...</h1>;
  }

  return (
    <div className="font-roboto mx-10 my-10">
      <h1 className="text-4xl font-bold">Project List</h1>
      {data!.map((project) => {
        return (
          <div className="w-6/12 mt-8" key={project.id}>
            <h1 className="text-xl font-medium">{project.name}</h1>
            <p className="mt-2">{project.description}</p>
            <Link className="w-36 mt-2 border-black border" to={`/projects/${project.id}`}>
              See more ...
            </Link>
          </div>
        );
      })}
      <div>
        <form onSubmit={handleSubmit((data) => mutate({ data }))} className="flex flex-col">
          {' '}
          <label className="mt-5" htmlFor="">
            Name
          </label>
          <input className="p-2 mt-2 border border-black" {...register('name')} type="text" />
          <label className="mt-5" htmlFor="">
            Description
          </label>
          <textarea className="h-28 p-2 mt-2 border border-black" {...register('description')}></textarea>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default ProjectList;
