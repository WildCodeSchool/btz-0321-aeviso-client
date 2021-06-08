import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useQueryClient } from "react-query";

interface Data {
  id: number;
  name: string;
  zipCode: string;
  city: string;
}
interface APIData extends Data {
  id: string;
  createdAt: string;
  updatedAt: string;
}

function UpdateCompany() {
  const { id }: { id: string } = useParams();
  const [error, setError] = useState<AxiosError | null>(null);
  const queryClient = useQueryClient();

  const updateCompany = async (data: Data) => {
    const res = await axios.put<Data>(
      `http://localhost:5000/api/v1/companies/${id}`,
      {
        name: data.name,
        zipCode: data.zipCode,
        city: data.city,
      }
    );
    return res.data;
  };

  // const mutation = useMutation(updateCompany, {
  //   onSuccess: (data: Data) => {
  //     queryClient.updateCompany(["todo", { id: 5 }], data);
  //   },
  // });

  // mutation.mutate({
  //   id: 5,
  //   name: "Do the laundry",
  // });

  if (error) {
    return (
      <p>
        An error has occurred:{error.message} Error Code : {error.code}
      </p>
    );
  }

  return (
    <div>
      <h3>Please update the Company</h3>
      <form action="">
        <label>
          Name :
          <input type="text" />
        </label>
        <label>
          Zip Code :
          <input type="text" />
        </label>
        <label>
          City:
          <input type="text" />
        </label>
      </form>
    </div>
  );
}

export default UpdateCompany;
