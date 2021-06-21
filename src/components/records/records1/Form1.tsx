import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function Form1(): JSX.Element {
  const { register, handleSubmit } = useForm();
  const [select1, setSelect1] = useState<boolean>(true);
  const [select2, setSelect2] = useState<boolean>(false);
  const [selectDate1, setSelectDate1] = useState<boolean>(false);
  const [selectDate2, setSelectDate2] = useState<boolean>(false);
  const [data, setData] = useState<unknown>();

  const companies = [
    {
      id: 1,
      name: 'companie1',
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

  const handleChange1 = () => {
    setSelect2(true);
    setSelect1(false);
  };
  const handleChange2 = () => {
    setSelect2(false);
    setSelectDate1(true);
  };

  const handleChange3 = () => {
    setSelectDate1(false);
    setSelectDate2(true);
  };
  console.log(data);

  return (
    <div>
      <h2 className="mt-2 text-xs sm:text-lg text-gray-300">
        Pour voir les heures de R&D déclarées, commencer en séléctionnent une entreprise.{' '}
      </h2>
      <form
        onSubmit={handleSubmit((data) => {
          setData(data);
        })}
        className="flex flex-col"
        action="sumbit"
      >
        {select1 ? (
          <div className="flex flex-col">
            {' '}
            <label className="mt-5 font-bold text-lg" htmlFor="select">
              1. Sélectionner une entreprise
            </label>
            <select
              {...register('namecompany')}
              className="focus:outline-none text-gray-300 text-sm bg-black border-b pt-1 pb-2 border-white"
            >
              {companies.map((company, index) => {
                return <option key={index}>{company.name}</option>;
              })}
            </select>{' '}
            <button
              onClick={handleChange1}
              type="button"
              className="focus:outline-none mt-5 w-4/12 rounded-sm bg-green"
            >
              ok
            </button>
          </div>
        ) : (
          ''
        )}

        {select2 ? (
          <div className="flex flex-col">
            {' '}
            <label className="mt-5 font-bold text-lg" htmlFor="select">
              2. Sélectionner une projet
            </label>
            <select
              {...register('nameprojet')}
              className="focus:outline-none text-gray-300 text-sm bg-black border-b pt-1 pb-2 border-white"
            >
              {projet.map((projet, index) => {
                return <option key={index}>{projet.name}</option>;
              })}
            </select>{' '}
            <button
              onClick={handleChange2}
              type="button"
              className="focus:outline-none mt-5 w-4/12 rounded-sm bg-green"
            >
              ok
            </button>
          </div>
        ) : (
          select1
        )}
        {selectDate1 ? (
          <div className="flex flex-col">
            <label className="mt-5 font-bold text-lg" htmlFor="select">
              3. Sélectionner une date de début
            </label>
            <input
              {...register('Date1')}
              className="focus:outline-none text-gray-300 text-sm bg-black border-b pt-1 pb-2 border-white"
              type="date"
            />
            <button
              onClick={handleChange3}
              type="button"
              className="focus:outline-none mt-5 w-4/12 rounded-sm bg-green"
            >
              ok
            </button>
          </div>
        ) : (
          ''
        )}
        {selectDate2 ? (
          <div className="flex flex-col">
            {' '}
            <label className="mt-5 font-bold text-lg" htmlFor="select">
              4. Sélectionner une date de fin
            </label>
            <input
              {...register('Date2')}
              className="focus:outline-none text-gray-300 text-sm bg-black border-b pt-1 pb-2 border-white"
              type="date"
            />
            <Link to="/exportéunrapport">
              <input type="submit" className="focus:outline-none mt-5 w-4/12 rounded-sm bg-green" />
            </Link>
          </div>
        ) : (
          ''
        )}
      </form>
    </div>
  );
}

export default Form1;
