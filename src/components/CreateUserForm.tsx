import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

interface Data {
  firstname: string;
  lastname: string;
  email: string;
  profession: string | null;
}

function User() {
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [profession, setProfession] = useState<string>("");
  const { isLoading, error, data } = useQuery<Data, Error>("user", () => {
    fetch(`http://localhost:5000/api/v1/users`, {
      method: "POST",
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        profession: profession,
      }),
    });
  });

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      <h3 className="mb-6">Create User</h3>
      <div className="border border-black mb-2"></div>
    </div>
  );
}

export default User;
