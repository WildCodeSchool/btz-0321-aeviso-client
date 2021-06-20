import React, { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
interface Form1 {
  setIsForm: Dispatch<SetStateAction<boolean>>;
}

function Form1({ setIsForm }: Form1): JSX.Element {
  const { register, handleSubmit } = useForm();

  const companies = [
    {
      id: 1,
      name: 'comp1',
    },
    {
      id: 2,
      name: 'companie2',
    },
    {
      id: 3,
      name: 'companie3',
    },
    {
      id: 4,
      name: 'companie4',
    },
  ];

  const projet = [
    {
      id: 1,
      name: 'projet1',
    },
    {
      id: 2,
      name: 'projet2',
    },
    {
      id: 3,
      name: 'projet3',
    },
    {
      id: 4,
      name: 'projet4',
    },
  ];
  const handleClick = () => {
    setIsForm(false);
  };
  return (
    <div>
      <h2 className="mt-2 text-gray-300">
        Pour voir les heures de R&D déclarées, commencer en séléctionnent une entreprise.{' '}
      </h2>
      <form onSubmit={handleSubmit((data) => console.log(data))} className="flex flex-col" action="sumbit">
        <label className="mt-5 font-bold text-lg" htmlFor="select">
          1. Sélectionner une entreprise
        </label>
        <select className="focus:outline-none text-gray-300 text-sm bg-black border-b pt-1 pb-2 border-white">
          {companies.map((company, index) => {
            return (
              <option {...register(company.name)} key={index}>
                {company.name}
              </option>
            );
          })}
        </select>

        <label className="mt-5 font-bold text-lg" htmlFor="select">
          2. Sélectionner une projet
        </label>
        <select className="focus:outline-none text-gray-300 text-sm bg-black border-b pt-1 pb-2 border-white">
          {projet.map((projet, index) => {
            return (
              <option {...register(projet.name)} key={index}>
                {projet.name}
              </option>
            );
          })}
        </select>
        <input onClick={handleClick} type="submit" className=" focus:outline-none mt-5 w-4/12 rounded-sm bg-green" />
      </form>
    </div>
  );
}

export default Form1;
