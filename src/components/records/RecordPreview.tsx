import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { user } from '../../API/requests';

interface IProps {
  record: IRecord;
  isLastElement: boolean;
}

function RecordPreview({ record, isLastElement }: IProps): JSX.Element {
  const formatDate = (date: Date): string => {
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  const { isLoading, error, data } = useQuery<User, AxiosError>(['users', record.userId], () =>
    user.getOne(record.userId)
  );
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <p>
        Error: {error.message}. Code: {error.code}
      </p>
    );
  }

  return (
    <Link to={`/records/${record.id}`} className="group">
      <p className="group-hover:bg-gray-800 group-hover:bg-opacity-30">
        {formatDate(new Date(record.date))} <span className="font-bold">{data?.role}</span> - {data?.firstName}{' '}
        {data?.lastName}
      </p>
      <p
        className={`truncate ${
          isLastElement ? '' : 'pb-1 border-b border-gray-600'
        } group-hover:bg-gray-800 group-hover:bg-opacity-30`}
      >
        {record.comment}
      </p>
    </Link>
  );
}

export default RecordPreview;
