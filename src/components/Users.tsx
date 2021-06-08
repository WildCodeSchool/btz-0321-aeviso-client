import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { user } from "../API/requests";
import UserForm from "./UserForm";

function Users(): JSX.Element {
  const { isLoading, error, data } = useQuery<User[], Error>(
    "users",
    user.getAll
  );

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>An error has occurred: {error.message}</p>;

  return (
    <div>
      <h3 className="mb-6">Users test</h3>
      <div>
        {data?.map((user) => {
          return (
            <div key={user.id} className="border border-black mb-2">
              <Link to={`/user/${user.id}`}>
                <p>
                  {user.firstname} {user.lastname}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
      <UserForm mutationFn={user.create} />
    </div>
  );
}

export default Users;
