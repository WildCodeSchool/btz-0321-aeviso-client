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
    <label className="mb-6 sm:mb-0 flex flex-col">
      {label}
      <input type="password" placeholder={placeholder} {...register(name, { required })} className="text-black" />
      <p className="text-red text-s">{error}</p>
    </label>
  );
}

export default PasswordInput;
