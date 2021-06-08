import React, { useState } from "react";
import { useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";

interface Data {
  name: string;
  zipCode: string;
  city: string;
}

interface APIData extends Data {
  id: string;
}

function Company() {
  const [name, setName] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const { isLoading, error, data } = useQuery<AxiosResponse<Data>, Error>(
    ["company", { method: "POST" }],
    () =>
      axios.post(`http://localhost:5000/api/v1/companies`, {
        body: JSON.stringify({
          name,
          zipCode,
          city,
        } as Data),
      })
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h3 className="mb-6">Create Company</h3>
      <div className="border border-black mb-2" />

      <form action="">
        <label>
          Name:
          <input type="text" defaultValue={data!.data.name} />
        </label>
        <label>
          Zip Code:
          <input type="text" defaultValue={data!.data.zipCode} />
        </label>
        <label>
          City:
          <input type="text" defaultValue={data!.data.city} />
        </label>
      </form>
    </div>
  );
}

export default Company;
