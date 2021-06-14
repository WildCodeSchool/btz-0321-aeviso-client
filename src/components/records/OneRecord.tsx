import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { records } from '../../API/requests';
import UpdateRecord from './UpdateRecord';
import DeleteRecord from './DeleteRecord';

function Record() {
  const { id }: { id: string } = useParams();

  const [record, setRecord] = useState<Records | null>(null);

  const { isLoading, error } = useQuery<Records, AxiosError>(['records', id], () => records.getOne(id), {
    onSuccess: (data) => {
      setRecord(data);
    },
    staleTime: Infinity,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <p>
        An error has occurred: {error.message}. Code: {error.code}
      </p>
    );
  }

  return (
    <div>
      <p>HELLO WORLD</p>
      {record && (
        <>
          <h3 className="mb-6">Test User</h3>
          <div className="border border-black mb-2">
            <p>{record!.id}</p>
            <p>{record!.user_id}</p>
            <p>{record!.project_id}</p>
            <p>{record!.step_id}</p>
            <p>{record!.time_slot}</p>
          </div>
          <UpdateRecord setRecord={setRecord} />
          <DeleteRecord />
        </>
      )}
    </div>
  );
}

export default Record;
