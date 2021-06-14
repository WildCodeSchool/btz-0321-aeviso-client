import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { companies } from '../../API/requests';

function Company({ setCompaniesList }: { setCompaniesList: Function }) {
  const { register, handleSubmit } = useForm<Company>();
  const [error, setError] = useState<AxiosError | null>(null);

  const { mutate } = useMutation(companies.post, {
    onSuccess: (data: Company) => {
      setCompaniesList((companies: any) => [...companies, data]);
    },
    onError: (error: AxiosError) => {
      console.log(error);
      setError(error);
    },
  });

  if (error)
    return (
      <p>
        An error has occurred: {error.message}. Error code: {error.code}
      </p>
    );

  return (
    <div>
      <h3 className="mb-6">Create Company</h3>
      <div className="border border-black mb-2" />

      <form action="" className="flex flex-col" onSubmit={handleSubmit((data) => mutate(data))}>
        <label>
          Name:
          <input type="text" {...register('name')} />
        </label>
        <label>
          Zip Code:
          <input type="text" {...register('zipCode')} />
        </label>
        <label>
          City:
          <input type="text" {...register('city')} />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Company;
