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
      setShowAlert(true);
      return;
    }

    setShowAlert(false);

    // تحويل الطول من سم إلى متر
    const heightInMeters = height / 100;

    // حساب مؤشر كتلة الجسم BMI
    const bmi = weight / (heightInMeters * heightInMeters);

    let status = "";
    if (bmi < 18.5) {
      status = "You are underweight.";
    } else if (bmi >= 18.5 && bmi < 25) {
      status = "Your weight is normal.";
    } else {
      status = "You are overweight.";
    }

    setResult(status);
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

        {/*  لعرض النتيجة */}
        {result && (
          <div className="buttonCal">
            <p>
              <strong>{result}</strong>
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
