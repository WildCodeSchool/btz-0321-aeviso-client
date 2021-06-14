import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="border py-4 flex justify-around border-black mb-3">
      <Link to="/">
        <span className="">Ae Viso </span>
      </Link>

      <Link to="/users">
        <span className="border-r border-black">Test users</span>
      </Link>
      <Link to="/projects" className="">
        <span>Test projects</span>
      </Link>
      <Link to="/Professions">
        <span className="border-r border-black">Test Professions</span>
      </Link>
    </div>
  );
}

export default Header;
