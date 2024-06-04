// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


const Navbar: React.FC = () => {
  return (
    <nav className="container navbar">
      <Link to="/">
        <div className="navbar-brand">
          <h1>RAVE RAVE</h1>
          <p>We are a rave community based in Sthlm</p>
        </div>
      </Link>
      <div className="navbar-links">
        <Link to="/">EVENTS</Link>
        <Link to="/admin">ADMIN</Link>
      </div>
    </nav>
  );
};

export default Navbar;
