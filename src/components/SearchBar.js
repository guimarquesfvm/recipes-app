import React from 'react';

export default function SearchBar() {
  return (
    <form>
      <label>
        <input type="radio" name="search-radio" data-testid="ingredient-search-radio" />
        Ingredient
      </label>
      <label>
        <input type="radio" name="search-radio" data-testid="name-search-radio" />
        Name
      </label>
      <label>
        <input type="radio" name="search-radio" data-testid="first-letter-search-radio" />
        First Letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </form>
  );
}
