import React, { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { jobs } from '../../API/requests';
import { AxiosError } from 'axios';

function CreateProfessionsForm({ setJobList }: { setJobList: Dispatch<SetStateAction<Job[]>> }): JSX.Element {
  const { register, handleSubmit } = useForm();

  const { mutate, isLoading, error, isSuccess } = useMutation<Job, AxiosError, Job>((data) => jobs.create(data), {
    onSuccess: (data) => {
      setJobList((prevState) => [...prevState, data]);
    },
  });

  if (isLoading) return <p>Sending User...</p>;
  if (error) return <p>An error has occurred</p>;
  if (isSuccess) return <p>User successfuly added</p>;

  return (
    <div>
      <h3 className="mb-6">Create Profession</h3>
      <div className="border border-black mb-2">
        <form onSubmit={handleSubmit((data: Job) => mutate(data))}>
          <label htmlFor="name">Enter job name:</label>
          <input type="text" {...register('name')} />

          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default CreateProfessionsForm;
