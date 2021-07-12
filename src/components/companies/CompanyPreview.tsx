import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { companies } from '../../API/requests';
import AdminJob from './AdminJob';

interface IProps {
  company: Company;
  isFirstElement: boolean;
}

function CompanyPreview({ company, isFirstElement }: IProps): JSX.Element {
  const { isLoading, error, data } = useQuery<User[], AxiosError>(['users', { companyId: company.id }], () =>
    companies.getUsers(company.id, 'ADMIN')
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-black dark:text-white">An error occurred: {error.message}</p>;
  }

  return (
    <div>
      <Link to={`/clients/${company.id}`} className="group">
        <div
          className={` font-bold text-base py-2 border-b border-black dark:border-white ${
            isFirstElement ? '' : 'font-bold text-sm sm:mt-5'
          }`}
        >
          <p className="font-bold">{company.name}</p>
          <p className="font-thin text-xs mr-2">
            {data?.length
              ? `${data?.[0]?.role} - ${data?.[0]?.firstName} ${data?.[0]?.lastName}`
              : 'Aucun admin enregistré'}
            {data?.[0]?.jobId && ' - '}
            {data?.[0]?.jobId && <AdminJob jobId={data?.[0].jobId} />}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default CompanyPreview;
