import React from 'react';
import BG from '../../media/images/BgAeivsio.webp';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { auth } from '../API/requests';
import Modal from '../components/Modal';
import useModal from '../Hook/useModal';
import { useHistory } from 'react-router';
import Spinner from '../components/Spinner';

interface IFormInput {
  email: string;
  password: string;
}

function HomePage(): JSX.Element {
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const { isModal, setIsModal, message, setMessage } = useModal();

  const { mutate, isLoading, isError } = useMutation(auth.login, {
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

  if (isLoading) return <Spinner />;
  if (isModal)
    return (
      <Modal
        message={message}
        handleClick={isError ? () => setIsModal((prevState) => !prevState) : () => history.push('/')}
      />
    );

  return (
    <div
      className="h-full w-full p-28 absolute top-0 left-0"
      style={{
        backgroundImage: `url(${BG})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'black',
        backgroundSize: 'cover',
      }}
    >
      <div className="text-white font-roboto container">
        <h1 className="text-8xl font-bold">aevisio</h1>
        <h2 className="text-2xl">Expert Comptable.Audit.Conseil</h2>
      </div>
      <form
        className="w-5/12 mt-10 flex flex-col text-white font-roboto text-xl"
        onSubmit={handleSubmit(onSubmit)}
        action="login"
      >
        <label className="mt-5" htmlFor="email">
          Email
        </label>
        <input
          className=" focus:outline-none mt-2 px-3 h-12 bg-input bg-opacity-50 rounded-lg shadow-inputShadow"
          type="text"
          {...register('email', { required: true })}
        />
        <label className="mt-5" htmlFor="Password">
          Mots de passe{' '}
        </label>
        <input
          className="focus:outline-none mt-2 px-3 h-12 bg-input bg-opacity-50 rounded-lg shadow-inputShadow"
          type="password"
          {...register('password', { required: true })}
        />
        <input className="bg-input py-1 bg-opacity-50 rounded-lg w-6/12 mt-8 shadow-inputShadow" type="submit" />
      </form>
    </div>
  );
}

export default HomePage;
