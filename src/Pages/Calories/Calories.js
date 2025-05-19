import React, { useState } from "react";
import "./Calories.css";
import { Link } from "react-router-dom";



function Calories() {
  const [data, setData] = useState({
    height: "",
    weight: "",
    age: "",
    gender: "",
    activity: "",
  });
  const [result, setResult] = useState(null);
  const [showAlert, setShowAlert] = useState(false);


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const calculateCalories = () => {
  const { weight, height, age, gender, activity } = data;

  if (!weight || !height || !age || !gender || !activity) {
    setShowAlert(true); // عرض التنبيه
    return;
  }

  setShowAlert(false); // إخفاء التنبيه إذا كل شي تمام

  let bmr = 0;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  let multiplier = 1.2;
  if (activity === "light") multiplier = 1.375;
  else if (activity === "moderate") multiplier = 1.55;
  else if (activity === "active") multiplier = 1.725;

  const calories = Math.round(bmr * multiplier);
  setResult(calories);
};
  return (
  <div className="calories-page">
    <h2 className="main-heading">Calculate Your Daily Calories</h2>

    <div className="calories-form">
      <label>
        Height (cm):
        <input type="number" name="height" onChange={handleChange} />
      </label>
      <label>
        Weight (kg):
        <input type="number" name="weight" onChange={handleChange} />
      </label>
      <label>
        Age (years):
        <input type="number" name="age" onChange={handleChange} />
      </label>
      <label>
        Gender:
        <select name="gender" onChange={handleChange}>
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <label>
        Activity Level:
        <select name="activity" onChange={handleChange}>
          <option value="">Select activity</option>
          <option value="light">Light</option>
          <option value="moderate">Moderate</option>
          <option value="active">Active</option>
        </select>
      </label>

      <button onClick={calculateCalories}>Calculate</button>

      {/*  تنبيه إذا كانت الحقول ناقصة */}
      {showAlert && (
        <div className="alert-box">
          <p>Please fill in all fields before calculating</p>
          <button onClick={() => setShowAlert(false)}>OK</button>
        </div>
      )}

      {/*  لعرض النتيجة  */}
      {result && (
        <div className="buttonCal">
          <p>
            Your daily calories need: <strong>{result}</strong> kcal
          </p>
        </div>
      )}
    </div>

    <div className="signup-reminder">
      <span role="img" aria-label="target">🎯</span>
      Want to track your daily calorie needs and set your health goals?{" "}
      <Link to="/signup" className="signup-button">Sign Up</Link> to get started!
    </div>
  </div>
);
}

export default Calories;
