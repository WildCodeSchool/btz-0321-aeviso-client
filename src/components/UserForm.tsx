import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';

interface IProps {
  initFirstname?: string;
  initLastname?: string;
  initEmail?: string;
  initProfession?: string | null;
  mutationFn: (variables: { user: User; id?: string }) => Promise<any>;
}

interface IFormInput {
  firstname: string;
  lastname: string;
  email: string;
  profession: string;
}

function userForm({
  initFirstname,
  initLastname,
  initEmail,
  initProfession,
  mutationFn,
}: IProps) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profession, setProfession] = useState('');

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    setFirstname(initFirstname!);
    setLastName(initLastname!);
    setEmail(initEmail!);
    setProfession(initProfession!);
  }, [initFirstname, initLastname, initEmail, initProfession]);

  const { mutate, isLoading, error, isSuccess } = useMutation(mutationFn);

  const { id } = useParams<{ id: string }>();

  const onSubmit: SubmitHandler<IFormInput> = ({
    firstname,
    lastname,
    email,
    profession,
  }) => {
    const user = {
      firstname,
      lastname,
      email,
      profession,
    };
    mutate({ user, id });
  };

  if (isLoading) return <p>Envoie dans la base de données</p>;
  if (error) return <p>Une erreur est survenue...</p>;
  if (isSuccess)
    return (
      <Modal
        message="Utilisateur correctement ajouté/modifié"
        handleClick={() => window.location.reload()}
      />
    );

  return (
    <div>
      <h3 className="mb-6">Create User</h3>
      <div className="border border-black mb-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-firstname">
            <label htmlFor="firstName">Prénom: </label>
            <input defaultValue={firstname} {...register('firstname')} />
          </div>
          <div className="form-lastname">
            <label htmlFor="lastName">Nom: </label>
            <input defaultValue={lastname} {...register('lastname')} />
          </div>
          <div className="form-mail">
            <label htmlFor="email">Email: </label>
            <input defaultValue={email} {...register('email')} />
          </div>
          <div className="form-job">
            <label htmlFor="profession">Fonction: </label>
            <input defaultValue={profession} {...register('profession')} />
          </div>
          <div className="form-submit">
            <input type="submit" value="Envoyer" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default userForm;
