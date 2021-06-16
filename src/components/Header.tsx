import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="border py-4 flex justify-around border-black mb-3">
      <Link to="/">Ae Viso</Link>
      <Link to="/users">
        <span className="border-r border-black">Test users</span>
      </Link>
      <Link to="/companies" className="border-r border-black">
        Test companies
      </Link>
      <Link to="/projects">Test projects</Link>
      <Link to="/Professions" className="border-r border-black">
        Test Professions
      </Link>
      <Link to="/records">Test Records</Link>
    </div>
  );
}

export default Header;
