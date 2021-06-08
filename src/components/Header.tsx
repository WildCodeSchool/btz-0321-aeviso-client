import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="border border-black mb-3">
      <Link to="/">
        <span className="border-r border-black">Ae Viso </span>
      </Link>

      
      <Link to="/users">
        <span className="border-r border-black">Test users</span>
      </Link>
      <Link to ="/Professions">
      <span className="border-r border-black">Test Professions</span>
      </Link>
    </div>
  );
}

export default Header;
