import React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  company: Company;
  isLastElement: boolean;
}

function RecordPreview({ company, isLastElement }: IProps): JSX.Element {
  return (
    <Link to={`/companies/${company.id}`} className="group">
      <p
        className={`${
          isLastElement ? '' : 'pb-1 border-b border-gray-600'
        } group-hover:bg-gray-800 group-hover:bg-opacity-30`}
      >
        <span className="font-bold">{company.name}</span>
      </p>
      {/*<p*/}
      {/*  className={`truncate ${*/}
      {/*    isLastElement ? '' : 'pb-1 border-b border-gray-600'*/}
      {/*  } group-hover:bg-gray-800 group-hover:bg-opacity-30`}*/}
      {/*>*/}
      {/*  {jobData?.name}*/}
      {/*</p>*/}
    </Link>
  );
}

export default RecordPreview;
