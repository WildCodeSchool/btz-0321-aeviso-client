import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

interface Data {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  profession: string | null;
}

function User() {
  const { id }: { id: string } = useParams();
  const { isLoading, error, data } = useQuery<Data, Error>("user", () =>
    fetch(`http://localhost:5000/api/v1/users/${id}`).then((res) => res.json())
  );

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      <h3 className="mb-6">Test User</h3>
      <div className="border border-black mb-2">
        <p>{data?.id}</p>
        <p>
          {data?.firstname} {data?.lastname}
        </p>
        <p>{data?.email}</p>
        <p>{data?.profession}</p>
      </div>
    </div>
  );
}

export default User;
