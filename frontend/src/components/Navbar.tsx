// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>RAVE RAVE</h1>
        <p>We are a rave community based in Sthlm</p>
      </div>
      <div className="navbar-links">
        <Link to="/">HOME</Link>
        <Link to="/register">REGISTER</Link>
        <Link to="/login">LOGIN</Link>
        <Link to="/dashboard">DASHBOARD</Link>
        <Link to="/admin">ADMIN</Link>
        <Link to="/invite">INVITE</Link>
      </div>
    </nav>
  );
};

export default Navbar;
