import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IProps {
  register: UseFormRegister<FieldValues>;
  name: string;
}

function SearchInput({ register, name }: IProps): JSX.Element {
  return (
    <input
      type="text"
      placeholder={'Rechercher'}
      className="pb-1 sm:w-6/12 w-full bg-transparent border-b border-black focus:outline-none dark:border-white"
      {...register(name)}
    />
  );
}

export default SearchInput;
