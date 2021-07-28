import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IProps {
  label: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  required: boolean;
  error?: string;
}

function PasswordInput({ label, placeholder, register, name, required = false, error }: IProps): JSX.Element {
  return (
    <label className="flex flex-col mt-4 font-bold">
      {label}
      <input
        type="password"
        placeholder={placeholder}
        {...register(name, { required, minLength: 4, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+/ })}
        className="mt-1 dark:bg-input shadow-buttonShadow bg-whiteGray text-black dark:text-white rounded-sm py-1 px-2 sm:h-10 sm:rounded-md"
      />
      <p className="text-red text-s">{error}</p>
    </label>
  );
}

export default PasswordInput;
