import React from 'react';
import { DeepMap, FieldError, FieldValues, UseFormRegister } from 'react-hook-form';

interface IMdp {
  error: DeepMap<FieldValues, FieldError>;
  register: UseFormRegister<FieldValues>;
}

function PasswordFom({ error, register }: IMdp): JSX.Element {
  return (
    <div>
      <form action="">
        <label className="flex flex-col mt-3">
          Mot de passe
          <input
            className="mt-1 bg-whiteInput shadow-buttonShadow dark:bg-input text-white rounded-sm py-1 px-2 sm:h-12 sm:rounded-md"
            type="password"
            {...register('password', { minLength: 4, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+/ })}
          />
          <p className="text-red-500">
            {error?.password?.type === 'pattern'
              ? 'Règle: une lettre majuscule, une lettre minuscule, un chiffre'
              : error?.password?.message}
          </p>
        </label>
        <label className="flex flex-col mt-3">
          Confirmer le mot de passe
          <input
            className="mt-1 bg-whiteInput shadow-buttonShadow dark:bg-input text-white rounded-sm py-1 px-2 sm:h-12 sm:rounded-md"
            type="password"
            {...register('confirmPassword', {
              minLength: 4,
              pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+/,
            })}
          />
          <p className="text-red-500">
            {error?.confirmPassword?.type === 'pattern'
              ? 'Règle: une lettre majuscule, une lettre minuscule, un chiffre'
              : error?.confirmPassword?.type}
          </p>
        </label>
      </form>
    </div>
  );
}

export default PasswordFom;
