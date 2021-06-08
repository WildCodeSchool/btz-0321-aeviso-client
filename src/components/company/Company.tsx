import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import UpdateCompany from "./UpdateCompany";

interface Data {
  id: number;
  name: string;
  zipCode: string;
  city: string;
}

function Company() {
  const { id }: { id: string } = useParams();

  const { isLoading, error, data } = useQuery<AxiosResponse<Data>, Error>(
    ["company", id],
    () => axios(`http://localhost:5000/api/v1/companies/${id}`)
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
            <p>{data!.data.id}</p>
            <p>{data!.data.name}</p>
            <p>{data!.data.zipCode}</p>
            <p>{data!.data.city}</p>
          </div>
          <button>UPDATE</button>
          <UpdateCompany />
        </>
      )}
    </div>
  );
}

export default Company;
