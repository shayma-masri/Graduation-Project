import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import RecipeSearch from "./Pages/Recipies/Recipes.js";
import Favorites from "./Pages/Favorites/Favorites";
import HomePage from "./Pages/HomePage/Homepage.js";
import Calories from "./Pages/Calories/Calories";
import Login from "./Pages/login/Login";
import Signup from "./Pages/signup/Signup";
import MultiStepForm from"./Pages/MultiStepForm/ProfileQuestions.js";
import TipsPage from "./Pages/Tips/Tips.js";


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    
    <>
    
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/RecipeSearch" element={<RecipeSearch />} />
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/Favorites" element={<Favorites />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/Calories" element={<Calories />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/ProfileQuestions" element={<MultiStepForm />} /> 
        <Route path="/tips" element={<TipsPage />} /> 


          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;


