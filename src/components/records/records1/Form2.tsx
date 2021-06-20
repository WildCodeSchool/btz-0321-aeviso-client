import React from 'react';

function Form2(): JSX.Element {
  return (
    <div>
      <h2 className="mt-2 text-gray-300">Sélectionnez une période</h2>
      <form className="flex flex-col" action="">
        <label className="mt-5 font-bold text-lg" htmlFor="select">
          3. Sélectionner une date de début
        </label>
        <input
          className="focus:outline-none text-gray-300 text-sm bg-black border-b pt-1 pb-2 border-white"
          type="date"
        />
        <label className="mt-5 font-bold text-lg" htmlFor="select">
          4. Sélectionner une date de fin
        </label>
        <input
          className="focus:outline-none text-gray-300 text-sm bg-black border-b pt-1 pb-2 border-white"
          type="date"
        />
        <div className="flex justify-between mt-5">
          <button className="mt-5 w-6/12 py-1 rounded-sm bg-green">Exporter le rapport</button>
        </div>
      </form>
    </div>
  );
}

export default Form2;
