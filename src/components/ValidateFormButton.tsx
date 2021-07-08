import React from 'react';

function ValidateFormButton({ text }: { text: string }): JSX.Element {
  return (
    <button
      type="submit"
      className="text-white shadow-buttonShadow rounded-lg mb-10 sm:mt-10 mx-4  px-12 py-2 bg-customGreen mt-5"
    >
      {text}
    </button>
  );
}

export default ValidateFormButton;
