import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { records } from '../../API/requests';

function RecordsForm({ setRecordsList }: { setRecordsList: Function }) {
  const { register, handleSubmit } = useForm<Records>();
  const [error, setError] = useState<AxiosError | null>(null);

  const { mutate } = useMutation(records.post, {
    onSuccess: (data: Records) => {
      setRecordsList((records: any) => [...records, data]);
    },
    onError: (error: AxiosError) => {
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
      <h3 className="mb-6">Create Recordy</h3>
      <div className="border border-black mb-2" />

      <form action="" className="flex flex-col" onSubmit={handleSubmit((data) => mutate(data))}>
        <label>
          User ID
          <input type="text" {...register('user_id')} />
        </label>
        <label>
          Project-Id
          <input type="text" {...register('project_id')} />
        </label>
        <label>
          Time Slot
          <input type="text" {...register('time_slot')} />
        </label>
        <label>
          Step-Id
          <input type="text" {...register('step_id')} />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RecordsForm;
