
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import SimilarRecipes from "../Similar Recipes/SimilarRecipes";
import "./Details.css";

const RecipeDetailsModal = ({
  recipe,
  onClose,
  onFetchSimilar,
  similarRecipes,
  onSimilarRecipeClick,
}) => (
  <div className="modal">
    <div className="modal-content">
      <button onClick={onClose}>
         <FontAwesomeIcon icon={faClose} />
      </button>
  
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />

      <h3>Ingredients</h3>
      <ul>
        {recipe.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>

      <h3>Instructions</h3>
    <p>{recipe.instructions}</p> 
      <div className="inst" style={{ marginBottom: "3vh" }}>
        <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
      </div>

      <button
        style={{ width: "22vh", marginRight: "5vh", marginTop: "-2vh" }}
        onClick={() => onFetchSimilar(recipe.id)}
      >
       Find Similar Recipes
      </button>

      {similarRecipes && similarRecipes.length > 0 && (
        <div className=" similar-recipes">
          <SimilarRecipes
            similarRecipes={similarRecipes}
            onSimilarRecipeClick={onSimilarRecipeClick}
          />
        </div>
      )}
    </div>
  </div>
);

export default RecipeDetailsModal;
