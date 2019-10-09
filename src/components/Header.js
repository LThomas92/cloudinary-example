import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-container">
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/add">
          <li>Image Form</li>
        </Link>
      </ul>
    </div>
  );
};

export default Header;
