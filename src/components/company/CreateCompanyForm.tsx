import React, { useState } from "react";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";

interface Data {
  name: string;
  zipCode: string;
  city: string;
}

interface APIData extends Data {
  id: string;
  createdAt: string;
  updatedAt: string;
}

function Company({ setCompanies }: { setCompanies: Function }) {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState<AxiosError | null>(null);

  const createCompany = async (data: Data) => {
    const res = await axios.post<Data>(
      `http://localhost:5000/api/v1/companies`,
      {
        name: data.name,
        zipCode: data.zipCode,
        city: data.city,
      }
    );

    return res.data;
  };

  const { mutate, data } = useMutation(createCompany, {
    onSuccess: (data: Data) => {
      setCompanies((companies: any) => [...companies, data]);
    },
    onError: (error: AxiosError) => {
      console.log(error);
      setError(error);
    },
  });

  if (error)
    return (
      <p>
        An error has occurred: {error.message}. Error code: {error.code}
      </p>
    );

  return (
    <div>
      <h3 className="mb-6">Create Company</h3>
      <div className="border border-black mb-2" />

      <form
        action=""
        className="flex flex-col"
        onSubmit={handleSubmit((data: Data) => mutate(data))}
      >
        <label>
          Name:
          <input type="text" {...register("name")} />
        </label>
        <label>
          Zip Code:
          <input type="text" {...register("zipCode")} />
        </label>
        <label>
          City:
          <input type="text" {...register("city")} />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Company;
