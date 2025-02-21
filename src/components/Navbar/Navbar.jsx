import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navContainer">
      <div className="logo">BabySteps</div>
      <div className="navItem">
      <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/bookings">
          <button>My Bookings</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
