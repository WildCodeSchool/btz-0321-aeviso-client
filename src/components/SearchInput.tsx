import React from 'react';

function SearchInput(): JSX.Element {
  return (
    <input
      type="text"
      placeholder="Rechercher"
      className="p-2 bg-transparent border border-white rounded-md focus:ring focus:ring-white"
    />
  );
}

export default SearchInput;
