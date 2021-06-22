import React, { Dispatch, SetStateAction, useState } from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';

interface BaseIProps {
  mutationFn: (variables: { user: User; id?: string }) => Promise<any>;
  setIsModal: Dispatch<SetStateAction<boolean>>;
  setMessage: Dispatch<SetStateAction<string>>;
}

interface UserIProps extends BaseIProps {
  initFirstname: string;
  initLastname: string;
  initEmail: string;
  initProfession: string | null;
}

interface IFormInput {
  firstname: string;
  lastname: string;
  email: string;
  profession: string;
}

function userForm(props: UserIProps | BaseIProps): JSX.Element {
  const { initFirstname, initLastname, initEmail, initProfession, mutationFn, setIsModal, setMessage } =
    props as UserIProps;

  const [user, setUser] = useState({
    firstname: initFirstname,
    lastname: initLastname,
    email: initEmail,
    profession: initProfession,
  });

  const { register, handleSubmit } = useForm();

  const { mutate, isLoading, error } = useMutation(mutationFn, {
    onSuccess: (data) => {
      setUser({
        ...data,
      });
      setMessage('Utilisateur correctement créé/ajouté');
      setIsModal((prevState) => !prevState);
    },
  });

  const { id } = useParams<{ id: string }>();

  const onSubmit: SubmitHandler<IFormInput> = ({ firstname, lastname, email, profession }) => {
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

  return (
    <div>
      <h3 className="mb-6">Create User</h3>
      <div className="border border-black mb-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-firstname">
            <label htmlFor="firstName">Prénom: </label>
            <input defaultValue={user.firstname} {...register('firstname')} />
          </div>
          <div className="form-lastname">
            <label htmlFor="lastName">Nom: </label>
            <input defaultValue={user.lastname} {...register('lastname')} />
          </div>
          <div className="form-mail">
            <label htmlFor="email">Email: </label>
            <input defaultValue={user.email} {...register('email')} />
          </div>
          <div className="form-job">
            <label htmlFor="profession">Fonction: </label>
            <input defaultValue={user.profession as string} {...register('profession')} />
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
