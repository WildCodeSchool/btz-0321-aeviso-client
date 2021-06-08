import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";

import CreateCompanyForm from "./CreateCompanyForm";

interface Data {
  id: number;
  name: string;
  city: string;
  zipCode: string;
}

function Companies() {
  const [companies, setCompanies] = useState<Data[]>([]);

  console.log({ companies });

  const { isLoading, error, data } = useQuery<AxiosResponse<Data[]>, Error>(
    "companies",
    () => axios.get("http://localhost:5000/api/v1/companies"),
    {
      onSuccess: (data: AxiosResponse<Data[]>) => setCompanies(data.data),
    }
  );

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
            {companies.map((company) => {
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
          <CreateCompanyForm setCompanies={setCompanies} />
        </>
      )}
    </div>
  );
}

export default Companies;
