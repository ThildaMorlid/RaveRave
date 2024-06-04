// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


const Navbar: React.FC = () => {
  return (
    <nav className="container navbar">
      <Link to="/">
        <div className="navbar-brand">
          <h1>RAVERAVE</h1>
          <p>Underground music events in Stockholm</p>
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

