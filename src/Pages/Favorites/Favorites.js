import React, { useState, useEffect, useRef } from "react";
import "./Favorites.css";
import RecipeCard from "../../Components/Recipe Card/RecipeCard";
import fetchRecipeDetails from "../../fetchRecipeDetails";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const modalRef = useRef(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (recipe) => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.id === recipe.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== recipe.id);
    } else {
      updatedFavorites = [...favorites, recipe];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites-container">
      <h1 className="header-favorites">Your Favorite Recipes</h1>
      <div>
        {favorites.length > 0 ? (
          <ul className="ul_favorites">
            <div>
              {favorites.map((recipe) => (
                <li key={recipe.id}>
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onDetailsClick={() =>
                      fetchRecipeDetails(recipe.id, setSelectedRecipe, modalRef)
                    }
                    isFavorite={favorites.some((fav) => fav.id === recipe.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                </li>
              ))}
            </div>
          </ul>
        ) : (
          <p>No favorite recipes yet!</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
