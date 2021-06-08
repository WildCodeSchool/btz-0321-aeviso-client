import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios, { AxiosResponse } from 'axios';

interface Data {
  id: number;
  name: string;
  city: string;
  zipCode: string;
}

function Companies() {
  const {
    isLoading,
    error,
    data,
  } = useQuery<AxiosResponse<Data[]>, Error>('companies', () => axios.get('http://localhost:5000/api/v1/companies'));

  if (isLoading) {
    return 'Loading...';
  }

  if (error) {
    return `An error has occurred: ${error.message}`;
  }

  return (
    <div>
      {data && (
        <>
          <h3 className="mb-6">Companies test</h3>
          <div>
            {data.data.map((company) => {
              return (
                <div key={company.id} className="border border-black mb-2">
                  <Link to={`/companies/${company.id}`}>
                    <p>
                      {company.name} in city: {company.city}
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Companies;
