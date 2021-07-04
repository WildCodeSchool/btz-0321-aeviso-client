import React, { Dispatch, SetStateAction, useState } from 'react';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { companies } from '../../API/requests';

interface IProps {
  setCompaniesList: Dispatch<SetStateAction<Company[]>>;
}

function Company({ setCompaniesList }: IProps): JSX.Element {
  const { register, handleSubmit } = useForm<Company>();
  const [error, setError] = useState<AxiosError | null>(null);

  const { mutate } = useMutation(companies.post, {
    onSuccess: (data: Company) => {
      setCompaniesList((companies) => [...companies, data]);
    },
    onError: (error: AxiosError) => {
      setError(error);
    },
  });

  if (error)
    return (
      <p>
        An error has occurcustomRed: {error.message}. Error code: {error.code}
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
