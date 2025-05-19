import React from "react";

const SearchBar = ({ query, onSearchChange, onSearchSubmit }) => (
  <form onSubmit={onSearchSubmit} className="search-bar-form">
    <input
      type="text"
      value={query}
      onChange={onSearchChange}
      placeholder="Search for recipes..."
      className="search-input"
    />
    <button type="submit" className="search-button">Search</button>
  </form>
);

export default SearchBar;
