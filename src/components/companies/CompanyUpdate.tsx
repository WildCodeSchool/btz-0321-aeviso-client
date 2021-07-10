import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { companies } from '../../API/requests';
import ImageInput from './Forms/CreateCompany/ImageInput';

function CompanyUpdate(): JSX.Element {
  const { id } = useParams<{ id?: string }>();
  const { register, watch, handleSubmit, setValue } = useForm();
  console.log(watch);
  console.log(id);
  const { isLoading, error, mutate } = useMutation<{ data: Company; id: string }>(companies.put);
  return (
    <div>
      <form onSubmit={handleSubmit((data) => mutate({ data, id }))}>
        <label htmlFor="name">Nom du client</label>
        <input type="text" {...register('name')} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default CompanyUpdate;
