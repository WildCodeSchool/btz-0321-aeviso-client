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

function EmailInput({ label, placeholder, register, name, error }: IProps): JSX.Element {
  return (
    <label className="flex flex-col mt-4 font-bold">
      {label}
      <input
        type="email"
        placeholder={placeholder}
        {...register(name, { required: true })}
        className="mt-1 dark:bg-input shadow-buttonShadow bg-whiteGray  text-black dark:text-white rounded-sm py-1 px-2 sm:h-12 sm:rounded-md"
      />
      <p className="text-red text-s">{error}</p>
    </label>
  );
}

export default EmailInput;
