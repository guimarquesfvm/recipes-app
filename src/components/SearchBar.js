import React, { useState } from 'react';

export default function SearchBar() {
  const [searchRadio, setSearchRadio] = useState('');
  const [search, setSearch] = useState('');

  const onClickButton = () => {
    console.log(searchRadio);
    console.log(search);

    const first = 'first-letter';

    if (searchRadio === first && search.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    } if (searchRadio === 'ingredient' && window.location.pathname === '/meals') {
      const link = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
      console.log(link);
    } if (searchRadio === 'name' && window.location.pathname === '/meals') {
      const link = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
      console.log(link);
    } if (searchRadio === first && window.location.pathname === '/meals') {
      const link = `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;
      console.log(link);
    }
  };

  return (
    <form>
      <input
        type="text"
        onChange={ (e) => setSearch(e.target.value) }
      />
      <label>
        <input
          type="radio"
          name="search-radio"
          data-testid="ingredient-search-radio"
          onClick={ () => setSearchRadio('ingredient') }
        />
        Ingredient
      </label>
      <label>
        <input
          type="radio"
          name="search-radio"
          data-testid="name-search-radio"
          onClick={ () => setSearchRadio('name') }
        />
        Name
      </label>
      <label>
        <input
          type="radio"
          name="search-radio"
          data-testid="first-letter-search-radio"
          onClick={ () => setSearchRadio('first-letter') }
        />
        First Letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => onClickButton() }
      >
        Search
      </button>
    </form>
  );
}
