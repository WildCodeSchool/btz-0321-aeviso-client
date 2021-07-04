import React from 'react';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { useHistory, useParams } from 'react-router';
import { records } from '../../API/requests';

function DeleteRecord(): JSX.Element {
  const { id }: { id: string } = useParams();
  const history = useHistory();

  const { mutate, error } = useMutation<unknown, AxiosError>(() => records.delete(id), {
    onSuccess: () => history.push(`/records`),
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
      <p>Do you want to delete this record ?</p>
      <button type="submit" onClick={() => mutate()} className="border border-black mb-2 bg-customRed-500">
        DELETE
      </button>
    </div>
  );
}

export default DeleteRecord;
