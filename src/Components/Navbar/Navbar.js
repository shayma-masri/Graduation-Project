import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaSearch, FaCalculator, FaKey, FaUserPlus } from "react-icons/fa"; // جبنا الأيقونات
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';

function Navbar1() {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/RecipeSearch");
  };

  const handleFav = () => {
    navigate("/Favorites");
  };

  const handleHomePage = () => {
    navigate("/HomePage");
  };

  const handleCalories = () => {
    navigate("/Calories");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="navbar-container">
      <div className="navbar-links">
        <div className="navbar-brand" onClick={handleHomePage}>
          Recipe Finder
        </div>

        <span onClick={handleSearchClick}>
          <FaSearch style={{ marginRight: '8px', color: 'white' }} /> Search
        </span>

        <span onClick={handleFav}>
          <FaHeart style={{ marginRight: '8px', color: 'white' }} /> Favorites
        </span>

        <span onClick={handleCalories}>
          <FaCalculator style={{ marginRight: '8px', color: 'white' }} /> Calories
        </span>

        <span onClick={handleLogin}>
          <FaKey style={{ marginRight: '8px', color: 'white' }} /> Login
        </span>

        <span onClick={handleSignup}
          data-tooltip-id="signup-navbar-tooltip"
          data-tooltip-content="sign up to save and track your daily calories">

          <FaUserPlus style={{ marginRight: '8px', color: 'white' }} /> Signup
        </span>
        <Tooltip id="signup-navbar-tooltip" />

      </div>
      <br />
    </div>
  );
}

export default Navbar1;
