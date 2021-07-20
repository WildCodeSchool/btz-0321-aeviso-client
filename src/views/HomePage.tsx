import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';

import { auth } from '../API/requests';
import Modal from '../components/Modal';
import Spinner from '../components/Spinner';
import useModal from '../hooks/useModal';
import { useUserFromStore } from '../store/user.slice';

interface IFormInput {
  email: string;
  password: string;
}

function HomePage(): JSX.Element {
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const { isModal, setIsModal, message, setMessage } = useModal();
  const { dispatchLogin } = useUserFromStore();

  const { mutate, isLoading, isError, data } = useMutation(auth.login, {
    onError: () => {
      setMessage('Une erreur est survenue');
      setIsModal((prevState) => !prevState);
    },
    onSuccess: () => {
      setMessage('Vous êtes bien authentifié');
      setIsModal((prevState) => !prevState);
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = ({ email, password }) => {
    const user = {
      email,
      password,
    };
    mutate(user);
  };

  const handleLogin = () => {
    if (data) dispatchLogin(data?.user);
    history.push('/');
  };

  if (isLoading) return <Spinner />;
  if (isModal)
    return (
      <Modal
        title="Authentification"
        buttons={
          !isError && data
            ? [{ text: 'Accueil', handleClick: () => handleLogin() }]
            : [{ text: 'Nouvel essai', handleClick: () => setIsModal((prevState) => !prevState) }]
        }
      >
        {message}
      </Modal>
    );

  return (
    <div className="h-full w-full sm:w-screen sm:h-screen flex flex-col justify-center items-center bg-bgImg bg-center bg-cover absolute top-0 right-0">
      <div className="text-white font-roboto flex items-center sm:items-center  flex-col">
        <h1 className="sm:text-9xl text-8xl font-bold">AeViso</h1>
        <h2 className="sm:text-4xl text-2xl">Expert Comptable.Audit.Conseil</h2>
      </div>
      <form
        className="w-full flex sm:w-6/12 justify-center mt-10 items-center sm:items-center flex-col text-white font-roboto text-xl sm:text-2xl"
        onSubmit={handleSubmit(onSubmit)}
        action="login"
      >
        <label className="mt-5" htmlFor="email">
          Email
        </label>
        <input
          className=" focus:outline-none bg-white bg-opacity-0 mt-2 mb-5 px-3 w-11/12 h-12 border-b border-white"
          type="text"
          {...register('email', { required: true })}
        />
        <label className="mt-5" htmlFor="Password">
          Mots de passe{' '}
        </label>
        <input
          className="focus:outline-none bg-white bg-opacity-0 mt-2 px-3 w-11/12 h-12 border-b border-white"
          type="password"
          {...register('password', { required: true })}
        />
        <input className="bg-customGreen py-1 rounded-md w-11/12 mt-16 shadow-inputShadow" type="submit" />
      </form>
    </div>
  );
}

export default HomePage;
