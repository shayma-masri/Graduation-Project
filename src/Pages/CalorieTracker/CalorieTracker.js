import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CalorieTracker.css';

const CalorieTracker = () => {
  const [dailyCalories, setDailyCalories] = useState(null);
  const [consumedCalories, setConsumedCalories] = useState(0);
  const [inputCalories, setInputCalories] = useState('');
  const [suggestedMeals, setSuggestedMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // جلب السعرات المستهلكة من localStorage عند بداية التحميل
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setDailyCalories(user.calories || 0);
    }
    const saved = localStorage.getItem('consumedCalories');
    if (saved) setConsumedCalories(Number(saved));
  }, []);

  // حفظ السعرات المستهلكة في localStorage عند كل تحديث
  useEffect(() => {
    localStorage.setItem('consumedCalories', consumedCalories);
  }, [consumedCalories]);

  // جلب الوصفات مع حساب السعرات المتبقية داخل useEffect
  useEffect(() => {
    if (dailyCalories === null) return;

    const remainingCalories = Math.max((dailyCalories || 0) - consumedCalories, 0);

    const fetchSuggestedMeals = async () => {
      if (remainingCalories === 0) {
        setSuggestedMeals([]);
        return;
      }

      setLoading(true);
      setError('');
      try {
        const response = await axios.get('https://api.spoonacular.com/recipes/findByNutrients', {
          params: {
            maxCalories: remainingCalories,
            number: 4,
            apiKey: process.env.REACT_APP_API_KEY,
          },
        });

        setSuggestedMeals(response.data);
      } catch (err) {
        setError('Failed to fetch meals.');
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedMeals();
  }, [dailyCalories, consumedCalories]);

  const handleAddCalories = () => {
    const value = parseInt(inputCalories);
    if (!isNaN(value) && value > 0) {
      setConsumedCalories(prev => prev + value);
      setInputCalories('');
    }
  };

  const resetCalories = () => {
    setConsumedCalories(0);
    localStorage.removeItem('consumedCalories');
  };

  if (dailyCalories === null) {
    return <p>Loading your calorie data...</p>;
  }

  const remainingCalories = Math.max((dailyCalories || 0) - consumedCalories, 0);

  return (
    <div className="calorie-tracker-container">
      <h2 className="calorie-heading">🍽️ Calorie Tracker</h2>
      <p className="calorie-text">Daily Requirement: <strong>{dailyCalories}</strong> kcal</p>
      <p className="calorie-text">Consumed: <strong>{consumedCalories}</strong> kcal</p>
      <p className="calorie-text">Remaining: <strong>{remainingCalories}</strong> kcal</p>

      <div className="input-group">
        <input
          type="number"
          className="calorie-input"
          placeholder="Enter the calories you consumed"
          value={inputCalories}
          onChange={(e) => setInputCalories(e.target.value)}
        />
        <button className="calorie-button" onClick={handleAddCalories}>Add</button>
      </div>

      <button className="calorie-button" onClick={resetCalories} style={{ marginTop: '10px', backgroundColor: '#999' }}>
        🔄 Reset Day
      </button>

      <h3 style={{ marginTop: '30px' }}>🔽 Suggested meals with ~ {remainingCalories} kcal:</h3>
      {loading && <p>⏳ Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="card-container">
        {suggestedMeals.map((meal) => (
          <div key={meal.id} className="card">
            <img src={meal.image} alt={meal.title} className="card-image" />
            <div className="card-content">
              <h4 className="card-title">{meal.title}</h4>
              <p className="card-text">🔥 Calories: {meal.calories} kcal</p>
              <p className="card-text">
                🥩 Protein: {meal.protein} | 🧈 Fat: {meal.fat} | 🍞 Carbs: {meal.carbs}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalorieTracker;
