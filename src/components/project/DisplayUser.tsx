import React from 'react';
import { useQuery } from 'react-query';
import { user } from '../../API/requests';
import JobDisplay from '../jobs/JobDisplay';

function DisplayUser({ id }: { id: string }): JSX.Element {
  const { data } = useQuery(['userInProject', id], () => user.getOne(id));
  return (
    <div className="flex flex-col">
      <p className="font-bold">
        {data?.firstName} {data?.lastName}
      </p>
      <p className="text-sm text-gray-400">
        <JobDisplay id={data?.jobId as string} />
      </p>
    </div>
  );
}

export default DisplayUser;
