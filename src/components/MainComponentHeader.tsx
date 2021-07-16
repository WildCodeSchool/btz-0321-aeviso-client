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
    <div className="dark:bg-component bg-white shadow-buttonShadow dark:shadow-mainShadow sm:sticky p-3 sm:p-5 sm:top-0">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center items-start mb-5">
        <h1 className="text-2xl font-bold">{title}</h1>
        <button
          onClick={handleClick}
          className="focus:outline-none sm:text-xs text-xs text-white bg-customBlue px-2 mt-5 sm:mt-0 sm:py-1 shadow-buttonShadow rounded-md flex items-center"
        >
          Nouveau rapport <img src={Plus} alt="Icône plus" className="p-1 rounded-full h-5 w-5 sm:h-5 sm:w-5" />
        </button>
      </div>
      <SearchInput register={register} name="search" />
    </div>
  );
}

export default MainComponentHeader;
