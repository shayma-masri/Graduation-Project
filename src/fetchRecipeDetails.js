import axios from "axios";

const fetchRecipeDetails = async (recipeId, setSelectedRecipe, modalRef) => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${API_KEY}`
    );
    setSelectedRecipe(response.data);
    setTimeout(() => {
      modalRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  } catch (error) {
    console.error("Error fetching recipe details:", error);
  }
};

export default fetchRecipeDetails;
