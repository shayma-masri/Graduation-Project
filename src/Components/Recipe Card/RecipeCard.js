import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import "./RecipeCard.css";

const RecipeCard = ({
  recipe,
  onDetailsClick,
  isFavorite,
  onToggleFavorite,
}) => (
  <li
  className="recipe-card"
  onClick={() => onDetailsClick(recipe.id)}
>
  <img src={recipe.image} alt={recipe.title} />
  <h3 id="h3_details">{recipe.title}</h3>
  <FontAwesomeIcon
    color={isFavorite ? "red" : "black"}
    icon={isFavorite ? fasHeart : farHeart}
    className={`heart-icon ${isFavorite ? "favorited" : ""}`}
    onClick={(e) => {
      e.stopPropagation(); // يمنع فتح التفاصيل عند الضغط على القلب
      onToggleFavorite(recipe);
    }}
  />
</li>


);

export default RecipeCard;
