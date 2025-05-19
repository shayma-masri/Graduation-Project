import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Recipes.css";
import RecipeCard from "../../Components/Recipe Card/RecipeCard";
import RecipeDetailsModal from "../../Components/Recipe Details/RecipeDetailsModal";
import SearchBar from "../../Components/Recipe Serach/SearchBar";
import FilterRecipe from "../../Components/Filter/FilterRecipe";
import fetchRecipeDetails from "../../fetchRecipeDetails";

const Recipes = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const modalRef = useRef(null);

  const [filters, setFilters] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    veryHealthy: false,
  });

  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    const fetchInitialRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`
        );
        setRecipes(response.data.recipes);
      } catch (error) {
        console.error("Error fetching initial recipes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialRecipes();
  }, [API_KEY]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    const filterParams = Object.keys(filters)
      .filter((key) => filters[key])
      .map((key) => `${key}=true`)
      .join("&");

    const sortParam = sortBy ? `&sort=${sortBy}` : "";

    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&${filterParams}${sortParam}&apiKey=${API_KEY}`
      );
      setRecipes(response.data.results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (recipe) => {
    const updatedFavorites = favorites.some((fav) => fav.id === recipe.id)
      ? favorites.filter((fav) => fav.id !== recipe.id)
      : [...favorites, recipe];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const fetchSimilar = async (recipeId) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/similar?apiKey=${API_KEY}`
      );
      setSimilarRecipes(response.data);
    } catch (error) {
      console.error("Error fetching similar recipes:", error);
    }
  };

  const handleSimilarRecipeClick = async (recipeId) => {
    await fetchRecipeDetails(recipeId, setSelectedRecipe, modalRef);
  };

  return (
    <div className="page-content">
      <nav className="homepage-navbar">  </nav>
    
      <FilterRecipe
        filters={filters}
        setFilters={setFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <SearchBar
        query={query}
        onSearchChange={(e) => setQuery(e.target.value)}
        onSearchSubmit={handleSearch}
      />

      {loading && <p>Loading...</p>}
      <div>
        {recipes.length > 0 && (
          <ul className="ul_recipes recipes-grid">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onDetailsClick={() =>
                  fetchRecipeDetails(recipe.id, setSelectedRecipe, modalRef)
                }
                isFavorite={favorites.some((fav) => fav.id === recipe.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </ul>
        )}
      </div>

      {selectedRecipe && (
        <RecipeDetailsModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onFetchSimilar={fetchSimilar}
          similarRecipes={similarRecipes}
          onSimilarRecipeClick={handleSimilarRecipeClick}
        />
      )}
    </div>
  );
};

export default Recipes;