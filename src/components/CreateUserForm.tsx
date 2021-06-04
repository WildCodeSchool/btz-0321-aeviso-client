import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";

interface User {
  firstname: string;
  lastname: string;
  email: string;
  profession: string | null;
}

function CreateUserForm() {
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [profession, setProfession] = useState<string>("");

  const mutation = useMutation((user: User) =>
    fetch("http://localhost:5000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
  );

  const handleSubmit = (e: Event) => {
    const newUser = {
      firstname,
      lastname,
      email,
      profession,
    };
    mutation.mutate(newUser);
  };

  if (mutation.isLoading) return <p>Sending User...</p>;
  if (mutation.error) return <p>An error has occurred</p>;
  if (mutation.isSuccess) return <p>User successfuly added</p>;

  return (
    <div>
      <h3 className="mb-6">Create User</h3>
      <div className="border border-black mb-2">
        <form onSubmit={handleSubmit}>
          <div className="form-example">
            <label htmlFor="firstName">Enter your first name: </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="form-example">
            <label htmlFor="lastName">Enter your last name: </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-example">
            <label htmlFor="email">Enter your email: </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-example">
            <label htmlFor="job">Enter your job: </label>
            <input
              type="job"
              name="job"
              id="job"
              onChange={(e) => setProfession(e.target.value)}
            />
          </div>
          <div className="form-example">
            <input type="submit" value="Create new user" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUserForm;
