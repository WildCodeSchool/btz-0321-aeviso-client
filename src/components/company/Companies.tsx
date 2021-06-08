import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { companies } from "../../API/requests";
import CreateCompanyForm from "./CreateCompanyForm";
import { AxiosError } from "axios";

function Companies() {
  const [companiesList, setCompaniesList] = useState<Company[]>([]);

  const { isLoading, error, data } = useQuery<Company[], AxiosError>(
    "companies",
    () => companies.getAll(),
    {
      onSuccess: (data) => setCompaniesList(data),
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
            {companiesList.map((company) => {
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
          <CreateCompanyForm setCompaniesList={setCompaniesList} />
        </>
      )}
    </div>
  );
}

export default Companies;
