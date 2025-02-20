import React from "react";
import { Link } from "react-router-dom";
import "./App.css"; 

const NavBar = () => {
  return (
    <nav className="navbar">
      <h2>React Programėlė</h2>
      <ul>
        <li><Link to="/">Užduočių sąrašas</Link></li>
        <li><Link to="/cart">Pirkinių krepšelis</Link></li>
        <li><Link to="/guess-game">Skaičių žaidimas</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
