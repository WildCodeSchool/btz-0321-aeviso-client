import React from 'react';

function ValidateFormButton({ text }: { text: string }): JSX.Element {
  return (
    <button
      type="submit"
      className="text-white w-full sm:w-4/12 shadow-buttonShadow rounded-md mb-10 sm:mt-10 sm:mx-0  px-10 py-2 bg-customGreen mt-5"
    >
      {text}
    </button>
  );
}

export default ValidateFormButton;
