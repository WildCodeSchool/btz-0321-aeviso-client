import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { companies, user } from '../../API/requests';

interface IProps {
  record: IRecord;
  isLastElement: boolean;
  isFirstElement: boolean;
}

function RecordPreview({ record, isLastElement, isFirstElement }: IProps): JSX.Element {
  const formatDate = (date: Date): string => {
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  const {
    isLoading: userIsLoading,
    error: userError,
    data: userData,
  } = useQuery<User, AxiosError>(['users', record.userId], () => user.getOne(record.userId as string));

  const {
    isLoading: companyIsLoading,
    error: companyError,
    data: companyData,
  } = useQuery<Company, AxiosError>(
    ['companies', userData?.companyId],
    () => companies.getOne(userData?.companyId as string),
    {
      enabled: !!userData,
    }
  );

  if (companyIsLoading || userIsLoading) {
    return <p className="flex justify-center">...</p>;
  }

  const error = companyError || userError;

  if (error) {
    return (
      <p>
        Error: {error.message}. Code: {error.code}
      </p>
    );
  }

  return (
    <div className="mx-3 mb-4 mt-4  sm:mx-5 text-black dark:text-white font-roboto">
      <Link to={`/records/${record.id}`} className="group">
        <p className={` font-bold text-base ${isFirstElement ? '' : 'font-bold text-sm sm:mt-5'} `}>
          {formatDate(new Date(record.date))} - {userData?.firstName} {userData?.lastName} - {companyData?.name}
        </p>
        <p
          className={` font-roboto text-gray-400 font-thin text-xs mr-2 ${
            isLastElement ? '' : 'pb-1 border-b border-black dark:border-white'
          }`}
        >
          {record.comment}
        </p>
      </Link>
    </div>
  );
}

export default RecordPreview;
