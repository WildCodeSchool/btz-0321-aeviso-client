import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { project } from '../../API/requests';
import Spinner from '../Spinner';
import { AxiosError } from 'axios';

interface Params {
  id: string;
}

function UniqueProject(): JSX.Element {
  const { id } = useParams<Params>();
  const history = useHistory();

  const {
    isLoading: projectLoading,
    error,
    data,
  } = useQuery<Project, AxiosError>(['project', id], () => project.getOne(id));

  const { isLoading: mutationLoading, mutateAsync } = useMutation(() => project.delete(id), {
    onSuccess: () => history.push('/projects'),
  });

  const loading = projectLoading || mutationLoading;
  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <p className="text-black dark:text-white">An error occurred: {error.message}</p>;
  }

  return (
    <div className="flex font-roboto mx-10 my-10">
      <div className="w-4/12">
        <h1 className="text-3xl font-medium">{data?.name}</h1>
        <p className="mt-2">{data?.description}</p>
        <button className="w-40 mt-5 border border-black px-5 " onClick={() => mutateAsync()}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default UniqueProject;
