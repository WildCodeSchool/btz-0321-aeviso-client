import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';

import { auth } from '../API/requests';
import Spinner from '../components/Spinner';
import { useUserFromStore } from '../store/user.slice';
import { AxiosError } from 'axios';

interface IFormInput {
  email: string;
  password: string;
}

interface IResMutation {
  message: string;
  user: User;
}

function HomePage(): JSX.Element {
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const { dispatchLogin } = useUserFromStore();

  const { mutate, isLoading, error } = useMutation<
    IResMutation,
    AxiosError<{ message_en: string; message_fr: string }>,
    IFormInput
  >(auth.login, {
    onSuccess: (data) => {
      dispatchLogin(data?.user as User);
      history.push('/');
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
          Mot de passe{' '}
        </label>
        <input
          className="focus:outline-none bg-white bg-opacity-0 mt-2 px-3 w-11/12 h-12 border-b border-white"
          type="password"
          {...register('password', { required: true })}
        />
        <input className="bg-customGreen py-1 rounded-md w-11/12 mt-16 shadow-inputShadow" type="submit" />
        <p className="text-red-500 mt-10 underline">{error?.response?.data?.message_fr}</p>
      </form>
    </div>
  );
}

export default HomePage;
