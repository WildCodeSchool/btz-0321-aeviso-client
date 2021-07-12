import React, { Dispatch, SetStateAction } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import Plus from '../../media/icons/Plus.svg';

import SearchInput from './SearchInput';

interface IProps {
  register: UseFormRegister<FieldValues>;
  title: string;
  setIsForm: Dispatch<SetStateAction<boolean>>;
}

function MainComponentHeader({ register, title, setIsForm }: IProps): JSX.Element {
  const handleClick = () => {
    setIsForm(true);
  };
  return (
    <>
      <h1 className="sm:text-4xl text-xl font-bold">{title}</h1>
      <div className="flex flex-col sm:flex-row justify-between mt-5 sm:items-center items-start">
        <SearchInput register={register} name="search" />

        <button
          onClick={handleClick}
          className="sm:text-base text-xs text-white bg-customBlue px-2 py-1 mt-5 sm:mt-0 sm:p-2 shadow-buttonShadow rounded-md flex items-center"
        >
          Créer Nouveau <img src={Plus} alt="Icône plus" className="ml-2 p-1 rounded-full h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>
    </>
  );
}

export default MainComponentHeader;