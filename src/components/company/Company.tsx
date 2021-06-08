import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import UpdateCompany from "./UpdateCompany";
import { companies } from "../../API/requests";

function Company() {
  const { id }: { id: string } = useParams();

  const { isLoading, error, data } = useQuery<Company, AxiosError>(
    ["company", id],
    () => companies.getOne(id)
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    // return "An error has occurred: " + error.message;
    return <p>An error has occurred: {error.message}</p>;
  }

  return (
    <div>
      {data && (
        <>
          <h3 className="mb-6">Test User</h3>
          <div className="border border-black mb-2">
            <p>{data!.id}</p>
            <p>{data!.name}</p>
            <p>{data!.zipCode}</p>
            <p>{data!.city}</p>
          </div>
          <UpdateCompany />
        </>
      )}
    </div>
  );
}

export default Company;
