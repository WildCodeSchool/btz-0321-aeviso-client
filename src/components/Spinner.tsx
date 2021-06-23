import React from 'react';

export default function Spinner(): JSX.Element {
  return (
    //OPTION CIRCLE
    // <div className="w- h-full flex justify-center ">
    //   <svg className="animate-spin w-20 text-center" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    //     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#E0DFD5" strokeWidth="4" />
    //     <path
    //       className="opacity-75"
    //       fill="#E8E9EB"
    //       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    //     />
    //   </svg>
    // </div>

    // OPTION DOTS
    <div className="flex justify-center items-center bg-black">
      <div className="w-5 h-5 mr-3 bg-indigo-200 rounded-full animate-pulse inline-flex opacity-75"></div>
      <div className="w-5 h-5 mr-3 bg-white rounded-full animate-bouncing"></div>
      <div className="w-5 h-5 mr-3 bg-white rounded-full animate-pulse"></div>
    </div>
  );
}
