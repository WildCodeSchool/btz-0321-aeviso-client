import React from 'react';
import BG from '../../media/images/BgAeivsio.webp';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function HomePage(): JSX.Element {
  const { register, handleSubmit } = useForm();

  return (
    <div
      className="h-screen w-screen p-28"
      style={{
        backgroundImage: `url(${BG})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'black',
        backgroundSize: 'cover',
      }}
    >
      <div className="text-white font-roboto">
        <h1 className="text-9xl font-bold">aevisio</h1>
        <h2 className="text-3xl">Expert Comptable.Audit.Conseil</h2>
      </div>
      <form
        className="w-5/12 mt-10 flex flex-col text-white font-roboto text-xl"
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
        action="login"
      >
        <label className="mt-5" htmlFor="email">
          Email
        </label>
        <input
          className=" focus:outline-none mt-2 p-3 h-14 bg-input bg-opacity-50 rounded-lg shadow-inputShadow"
          type="text"
          {...register('mail', { required: true })}
        />
        <label className="mt-5" htmlFor="Password">
          Mots de passe{' '}
        </label>
        <input
          className="focus:outline-none mt-2 p-3 h-14 bg-input bg-opacity-50 rounded-lg shadow-inputShadow"
          type="text"
          {...register('passWord', { required: true })}
        />
        <Link to="/">
          <input className="bg-input py-1 bg-opacity-50 rounded-lg w-6/12 mt-8 shadow-inputShadow" type="submit" />
        </Link>
      </form>
    </div>
  );
}

export default HomePage;
