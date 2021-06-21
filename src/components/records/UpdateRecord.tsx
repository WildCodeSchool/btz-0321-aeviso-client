import React, { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { records } from '../../API/requests';

interface Data {
  id: string;
  data: IRecord;
}

function UpdateRecord({ setRecord }: { setRecord: Dispatch<SetStateAction<IRecord | null>> }): JSX.Element {
  const { register, handleSubmit } = useForm<IRecord>();
  const { id }: { id: string } = useParams();

  const { mutate, error } = useMutation<null, AxiosError, Data>((data) => records.put(data), {
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
          mutate({ id, data });
        })}
      >
        <label>
          TIME SLOT
          <input type="text" {...register('timeslot')} />
        </label>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateRecord;
