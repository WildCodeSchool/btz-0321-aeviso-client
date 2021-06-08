import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router";

interface IProps {
  initFirstname?: string;
  initLastname?: string;
  initEmail?: string;
  initProfession?: string | null;
  mutationFn: (variables: { user: User; id?: string }) => Promise<any>;
}

function userForm({
  initFirstname,
  initLastname,
  initEmail,
  initProfession,
  mutationFn,
}: IProps) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");

  useEffect(() => {
    setFirstname(initFirstname!);
    setLastName(initLastname!);
    setEmail(initEmail!);
    setProfession(initProfession!);
  }, [initFirstname, initLastname, initEmail, initProfession]);

  const { mutate, isLoading, error, isSuccess } = useMutation(mutationFn);

  const { id } = useParams<{ id: string }>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      firstname,
      lastname,
      email,
      profession,
    };
    mutate({ user, id });
  };

  if (isLoading) return <p>Sending User...</p>;
  if (error) return <p>An error has occurred</p>;
  if (isSuccess) return <p>User successfuly added</p>;

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
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-example">
            <label htmlFor="email">Enter your email: </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-example">
            <label htmlFor="job">Enter your job: </label>
            <input
              type="job"
              name="job"
              id="job"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            />
          </div>
          <div className="form-example">
            <input type="submit" value="Mettre à jour" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default userForm;
