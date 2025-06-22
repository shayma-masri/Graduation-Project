import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MultiStepForm.css";

const ProfileQuestions = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    age: "",
    gender: "male",
    activityLevel: "sedentary",
    goal: "maintain"
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.height || formData.height < 100) {
      setError("Height must be at least 100cm");
      return;
    }
    if (!formData.weight || formData.weight < 30) {
      setError("Weight must be at least 30kg");
      return;
    }
    if (!formData.age || formData.age < 10) {
      setError("Age must be at least 10");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://graduationapp.test/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          height: parseFloat(formData.height),
          weight: parseFloat(formData.weight),
          age: parseInt(formData.age, 10),
          gender: formData.gender,
          activity_level: formData.activityLevel,
         // goal: formData.goal
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to save profile data");
      } else {
        navigate('/login', {
          state: {
            calorieNeeds: data.calorie_needs,
            userProfile: data.profile
          }
        });
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Complete Your Profile</h2>
      <p>Please answer these questions to personalize your experience</p>
      
      <form className="auth-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Height (cm):</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            min="100"
            required
          />
        </div>

        <div className="form-group">
          <label>Weight (kg):</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            min="30"
            required
          />
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="10"
            required
          />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label>Activity Level:</label>
          <select name="activityLevel" value={formData.activityLevel} onChange={handleChange}>
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="light">Lightly active (light exercise 1-3 days/week)</option>
            <option value="moderate">Moderately active (moderate exercise 3-5 days/week)</option>
            <option value="active">Very active (hard exercise 6-7 days/week)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Goal:</label>
          <select name="goal" value={formData.goal} onChange={handleChange}>
            <option value="lose">Lose Weight</option>
            <option value="maintain">Maintain Weight</option>
            <option value="gain">Gain Weight</option>
          </select>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfileQuestions;
