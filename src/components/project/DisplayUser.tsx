import React from 'react';
import { useQuery } from 'react-query';
import { user } from '../../API/requests';

function DisplayUser({ id }: { id: string }): JSX.Element {
  const { data } = useQuery(['userInProject', id], () => user.getOne(id));
  return (
    <div className="flex items-center">
      <p>
        {data?.firstName} {data?.lastName}
      </p>
    </div>
  );
}

export default DisplayUser;
