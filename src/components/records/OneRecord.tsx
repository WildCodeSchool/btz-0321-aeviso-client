import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { records } from '../../API/requests';
import UpdateRecord from './UpdateRecord';
import DeleteRecord from './DeleteRecord';
import Spinner from '../Spinner';

function Record(): JSX.Element {
  const { id }: { id: string } = useParams();

  const [record, setRecord] = useState<IRecord | null>(null);

  const { isLoading, error } = useQuery<IRecord, AxiosError>(['records', id], () => records.getOne(id), {
    onSuccess: (data) => {
      setRecord(data);
    },
    staleTime: Infinity,
  });

  if (isLoading) {
    return <Spinner />;
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
            <p>{record.id}</p>
            <p>{record.userId}</p>
            <p>{record.projectId}</p>
            <p>{record.timeslot}</p>
          </div>
          <UpdateRecord setRecord={setRecord} />
          <DeleteRecord />
        </>
      )}
    </div>
  );
}

export default Record;
