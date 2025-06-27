import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

import {
  FaHeart,
  FaSearch,
  FaCalculator,
  FaKey,
  FaUserPlus,
  FaLightbulb,
  FaSignOutAlt,
  FaUserCircle,
  FaChartLine 
} from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import homeIcon from "../../Assets/homeIcon.PNG";

function Navbar1() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="navbar-container">
      <div className="navbar-links">
        <img
          src={homeIcon}
          alt="Home"
          onClick={() => navigate("/HomePage")}
          style={{
            width: "130px",
            height: "100px",
            cursor: "pointer",
            marginRight: "16px"
          }}
          title="Go to Homepage"
        />

        <span onClick={() => navigate("/RecipeSearch")}>
          <FaSearch style={{ marginRight: '8px', color: 'white' }} /> Search
        </span>

        <span onClick={() => navigate("/Favorites")}>
          <FaHeart style={{ marginRight: '8px', color: 'white' }} /> Favorites
        </span>

        <span onClick={() => navigate("/Calories")}>
          <FaCalculator style={{ marginRight: '8px', color: 'white' }} /> Calories
        </span>

        <span onClick={() => navigate("/tips")}>
          <FaLightbulb style={{ marginRight: '8px', color: 'white' }} /> Tips
        </span>

        {/*  عناصر تظهر فقط إذا كان المستخدم مسجل دخول هاي */}
        {user ? (
          <>
            <span onClick={() => navigate("/calorietracker")}>
              <FaChartLine style={{ marginRight: '8px', color: 'white' }} /> Tracker
            </span>

            <span>
              <FaUserCircle style={{ marginRight: '8px', color: 'white' }} />
              Hi, <span style={{ fontWeight: "bold" }}>{user.name}</span>
            </span>

            <span onClick={handleLogout}>
              <FaSignOutAlt style={{ marginRight: '8px', color: 'white' }} /> Logout
            </span>
          </>
        ) : (
          <>
            <span onClick={() => navigate("/login")}>
              <FaKey style={{ marginRight: '8px', color: 'white' }} /> Login
            </span>

            <span
              onClick={() => navigate("/signup")}
              data-tooltip-id="signup-navbar-tooltip"
              data-tooltip-content="Sign up to save and track your daily calories"
            >
              <FaUserPlus style={{ marginRight: '8px', color: 'white' }} /> Signup
            </span>

            <Tooltip id="signup-navbar-tooltip" />
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar1;
