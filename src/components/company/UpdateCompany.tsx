import React, { useState } from "react";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { companies } from "../../API/requests";

function UpdateCompany() {
  const { register, handleSubmit } = useForm<Company>();
  const { id }: { id: string } = useParams();
  const [error, setError] = useState<AxiosError | null>(null);

  const { mutate } = useMutation(companies.put, {
    onSuccess: () => {
      console.log("Update done");
    },
    onError: (error: AxiosError) => {
      console.log(error);
      setError(error);
    },
  });

  const { mutateAsync } = useMutation(() => companies.delete(id), {
    onSuccess: () => console.log("ok done"),
    onError: (error: AxiosError) => {
      console.log(error);
      setError(error);
    },
  });

  if (error) {
    return (
      <p>
        An error has occurred:{error.message} Error Code : {error.code}
      </p>
    );
  }

  return (
    <div>
      <p>Do you want to delete this company</p>
      <button
        type="submit"
        onClick={() => mutateAsync()}
        className="border border-black mb-2 bg-red-500"
      >
        DELETE{" "}
      </button>

      <h3>Please update the Company</h3>
      <form
        action=""
        className="flex flex-col"
        onSubmit={handleSubmit((data) => mutate({ id, data }))}
      >
        <label>
          Name :
          <input type="text" {...register("name")} />
        </label>
        <label>
          Zip Code :
          <input type="text" {...register("zipCode")} />
        </label>
        <label>
          City:
          <input type="text" {...register("city")} />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateCompany;
