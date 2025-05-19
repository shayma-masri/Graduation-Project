import React from "react";

const SimilarRecipes = ({ similarRecipes, onSimilarRecipeClick }) => (
  <div>
    <h2 style={{ color: "rgb(38, 142, 93)" }}>Similar Recipes</h2>
    <ul>
      {similarRecipes.map((recipe) => (
        <li key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>Ready in {recipe.readyInMinutes} minutes</p>
          <button onClick={() => onSimilarRecipeClick(recipe.id)}>
            View Recipe
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default SimilarRecipes;
