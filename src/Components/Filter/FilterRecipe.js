import React from "react";
import "./Filter.css";

const FilterRecipe = ({ filters, setFilters, sortBy, setSortBy }) => {
  const handleFilterChange = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  const filterLabels = {
    vegetarian: "Vegetarian",
    vegan: "Vegan",
    glutenFree: "Gluten-Free",
    dairyFree: "Dairy-Free",
    veryHealthy: "Very Healthy",
  };

  return (
    <div className="filters-sort-wrapper">
      <div className="filters-section">
        {Object.entries(filterLabels).map(([key, label]) => (
          <label key={key} className="filter-option">
            <input
              type="checkbox"
              checked={filters[key]}
              onChange={() => handleFilterChange(key)}
            />
            {label}
          </label>
        ))}
      </div>

      <div className="sort-section">
        <label htmlFor="sortSelect">Sort By:</label>
        <select
          id="sortSelect"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Relevance</option>
          <option value="popularity">Popularity</option>
          <option value="healthiness">Health Score</option>
          <option value="pricePerServing">Price Per Serving</option>
        </select>
      </div>
    </div>
  );
};

export default FilterRecipe;
