import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import CreateUserForm from "./CreateUserForm";

interface Data {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  profession: string | null;
}

function Users() {
  const { isLoading, error, data } = useQuery<Data[], Error>("users", () =>
    fetch("http://localhost:5000/api/v1/users").then((res) => res.json())
  );
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  if (data)
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
        <CreateUserForm />
      </div>
    );
}

export default Users;
