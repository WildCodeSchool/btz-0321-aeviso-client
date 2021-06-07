import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Modal from './Modal';

interface User {
  firstname: string;
  lastname: string;
  email: string;
  profession: string;
}

function User() {
  const { id }: { id: string } = useParams();

  const [isModal, setIsModal] = useState(false);

  const { isLoading, error, data } = useQuery<User, Error>('user', () =>
    fetch(`http://localhost:5000/api/v1/users/${id}`).then((res) =>
      res.json().then((data) => {
        setFirstname(data.firstname);
        setLastName(data.lastname);
        setEmail(data.email);
        setProfession(data.profession);
      }),
    ),
  );

  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [profession, setProfession] = useState<string>('');

  const [message, setMessage] = useState<string>('');

  const handleDeleteUser = () => {
    fetch(`http://localhost:5000/api/v1/users/${id}`, {
      method: 'DELETE',
    })
      .then(() => setMessage('Utilisateur effacé'))
      .then(() => setIsModal((prevSate) => !prevSate))
      .catch(() => setMessage("Problème lors de l'effacement"));
  };

  const mutation = useMutation((user: User) =>
    fetch(`http://localhost:5000/api/v1/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((json) => console.log(json)),
  );

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const newUser = {
      firstname,
      lastname,
      email,
      profession,
    };
    mutation.mutate(newUser);
  };

  if (isModal) return <Modal message={message} />;
  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;
  return (
    <div>
      <h3 className="mb-6">Test User</h3>
      <div className="border border-black mb-2">
        <form onSubmit={handleSubmit}>
          <div className="form-example">
            <label htmlFor="firstName">Firstname: </label>
            <input type="text" name="firstName" id="firstName" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
          </div>
          <div className="form-example">
            <label htmlFor="lastName">Lastname: </label>
            <input type="text" name="lastName" id="lastName" value={lastname} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="form-example">
            <label htmlFor="email">email: </label>
            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-example">
            <label htmlFor="job">Job: </label>
            <input type="job" name="job" id="job" value={profession} onChange={(e) => setProfession(e.target.value)} />
          </div>
          <div className="form-example">
            <input type="submit" value="Modifier" />
          </div>
        </form>
      </div>
      <button onClick={handleDeleteUser}>Supprimer</button>
    </div>
  );
}

export default User;
