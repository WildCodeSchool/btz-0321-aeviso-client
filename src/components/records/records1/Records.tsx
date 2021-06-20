import React, { useState } from 'react';
import Form1 from './Form1';
import Form2 from './Form2';
// import Form from './Form';

function Records(): JSX.Element {
  const [isForm, setIsForm] = useState<boolean>(true);

  const handleClick = () => {
    setIsForm(true);
  };
  return (
    <div className="text-white font-roboto p-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Exporter un rapport</h1>
        {isForm === false ? (
          <button onClick={handleClick} className="focus:outline-none w-3/12 py-1 rounded-sm bg-blue">
            Retour
          </button>
        ) : (
          ''
        )}
      </div>

      {isForm ? <Form1 setIsForm={setIsForm} /> : <Form2 />}
      {/* <Form /> */}
    </div>
  );
}

export default Records;
