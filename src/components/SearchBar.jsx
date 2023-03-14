import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { searchApi } from '../helpers/mealsAPI';
import '../style/SearchBar.css';

export default function SearchBar() {
  const history = useHistory();
  const { setApi } = useContext(RecipesContext);
  const [searchRadio, setSearchRadio] = useState('');
  const [search, setSearch] = useState('');
  const doze = 12;

  const onClickButton = async () => {
    if (searchRadio === 'first-letter' && search.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }

    const searchTypeToApiEndpoint = {
      'first-letter': {
        meals: 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
        drinks: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=',
      },
      ingredient: {
        meals: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
        drinks: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=',
      },
      name: {
        meals: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
        drinks: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      },
    };

    const apiEndpoint = searchTypeToApiEndpoint[searchRadio][window
      .location.pathname.slice(1)];
    const link = apiEndpoint + search;
    // console.log(link);
    const api = await searchApi(link);
    // console.log(api);

    if (api.meals && api.meals.length > 0) {
      if (api.meals.length === 1) {
        history.push(`/meals/${api.meals[0].idMeal}`);
      }
      setApi(api.meals.slice(0, doze));
    } if (api.drinks && api.drinks.length > 0) {
      if (api.drinks.length === 1) {
        history.push(`/drinks/${api.drinks[0].idDrink}`);
      }
      setApi(api.drinks.slice(0, doze));
    }
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  };

  return (
    <form className="Search-Bar">
      <input
        className="input-search"
        type="text"
        onChange={ (e) => setSearch(e.target.value) }
        data-testid="search-input"
      />
      <div className="div-search">
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
      </div>
      <button
        className="search-button"
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => onClickButton() }
      >
        <strong>Search</strong>
      </button>

    </form>
  );
}
