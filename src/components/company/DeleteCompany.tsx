import React from 'react';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { useHistory, useParams } from 'react-router';
import { companies } from '../../API/requests';

function DeleteCompany(): JSX.Element {
  const { id }: { id: string } = useParams();
  const history = useHistory();

  const { mutate, error } = useMutation<void, AxiosError>(() => companies.delete(id), {
    onSuccess: () => history.push('/companies'),
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
      <p>Do you want to delete this company ?</p>
      <button type="submit" onClick={() => mutate()} className="border border-black mb-2 bg-red-500">
        DELETE
      </button>
    </div>
  );
}

export default DeleteCompany;
