import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { records } from '../../API/requests';

interface IProps {
  setRecordsList: React.Dispatch<React.SetStateAction<IRecord[]>>;
}

function RecordsForm({ setRecordsList }: IProps): JSX.Element {
  const { register, handleSubmit } = useForm<IRecord>();
  const [error, setError] = useState<AxiosError | null>(null);

  const { mutate } = useMutation(records.post, {
    onSuccess: (data: IRecord) => {
      setRecordsList((records) => [...records, data]);
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
      <h3 className="mb-6">Create Recordy</h3>
      <div className="border border-black mb-2" />

      <form action="" className="flex flex-col" onSubmit={handleSubmit((data) => mutate(data))}>
        <label>
          User ID
          <input type="text" {...register('userId')} />
        </label>
        <label>
          Project-Id
          <input type="text" {...register('projectId')} />
        </label>
        <label>
          Time Slot
          <input type="text" {...register('timeslot')} />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RecordsForm;
