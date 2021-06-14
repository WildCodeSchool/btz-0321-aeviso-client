import React, { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { records } from '../../API/requests';

interface Data {
  id: string;
  data: Records;
}

function UpdateRecord({ setRecord }: { setRecord: Dispatch<SetStateAction<Records | null>> }) {
  const { register, handleSubmit } = useForm<Records>();
  const { id }: { id: string } = useParams();

  const {
    mutate,
    error,
    data: sentData,
  } = useMutation<Records, AxiosError, Data>((data) => records.put(data), {
    onSuccess: (data) => setRecord(data),
  });

  if (error) {
    return (
      <p>
        An error occurred: {error.message}. Code: {error.code}
      </p>
    );
  }

  return (
    <div>
      <h3>Please update the Record</h3>
      <form
        action=""
        className="flex flex-col"
        onSubmit={handleSubmit((data) => {
          console.log(data);
          mutate({ id, data });
        })}
      >
        <label>
          TIME SLOT
          <input type="text" {...register('time_slot')} />
        </label>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateRecord;
