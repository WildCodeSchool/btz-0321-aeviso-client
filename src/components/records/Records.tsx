import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { records } from '../../API/requests';
import CreateRecordsForm from './CreateRecordsForm';
import { AxiosError } from 'axios';

function Records() {
  const [recordsList, setRecordsList] = useState<Records[]>([]);

  const { isLoading, error, data } = useQuery<Records[], AxiosError>('records', () => records.getAll(), {
    onSuccess: (data) => setRecordsList(data),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <div>
      {data && (
        <>
          <h3 className="mb-6">Companies test</h3>
          <div>
            {recordsList.map((record) => {
              return (
                <div key={record.id} className="border border-black mb-2">
                  <Link to={`/records/${record.id}`}>
                    <p>
                      {record.user_id} {record.project_id} {record.step_id} {record.time_slot}
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>
          <CreateRecordsForm setRecordsList={setRecordsList} />
        </>
      )}
    </div>
  );
}

export default Records;
