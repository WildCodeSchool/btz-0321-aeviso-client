import React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  company: Company;
  isFirstElement: boolean;
}

function CompanyPreview({ company, isFirstElement }: IProps): JSX.Element {
  return (
    <div>
      <Link to={`/clients/${company.id}`} className="group">
        <p
          className={` font-bold text-base py-2 border-b border-black dark:border-white ${
            isFirstElement ? '' : 'font-bold text-sm sm:mt-5'
          } `}
        >
          <span className="font-bold">{company.name}</span>
        </p>
      </Link>
    </div>
  );
}

export default CompanyPreview;
