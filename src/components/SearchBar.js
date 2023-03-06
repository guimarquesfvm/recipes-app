import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { searchApi } from '../helpers/mealsAPI';

export default function SearchBar() {
  const history = useHistory();
  const { setApi } = useContext(RecipesContext);
  const [searchRadio, setSearchRadio] = useState('');
  const [search, setSearch] = useState('');

  const onClickButton = async () => {
    console.log(searchRadio);
    console.log(search);

    const first = 'first-letter';

    if (searchRadio === first && search.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    } if (searchRadio === 'ingredient' && window.location.pathname === '/meals') {
      const link = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
      console.log(link);
      const api = await searchApi(link);
      console.log(api.meals);
      if (api.meals.length === 1) {
        history.push(`/meals/${api.meals[0].idMeal}`);
      } if (api.meals.length === 0) {
        global.alert("Sorry, we haven't found any recipes for these filters.");
      }
      setApi(api.meals.slice(0, 12));
    } if (searchRadio === 'name' && window.location.pathname === '/meals') {
      const link = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
      console.log(link);
      const api = await searchApi(link);
      console.log(api.meals);
      if (api.meals.length === 1) {
        history.push(`/meals/${api.meals[0].idMeal}`);
      } if (api.meals.length === 0) {
        global.alert("Sorry, we haven't found any recipes for these filters.");
      }
      setApi(api.meals.slice(0, 12));
    } if (searchRadio === first && window.location.pathname === '/meals') {
      const link = `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;
      console.log(link);
      const api = await searchApi(link);
      console.log(api.meals);
      if (api.meals.length === 1) {
        history.push(`/meals/${api.meals[0].idMeal}`);
      } if (api.meals.length === 0) {
        global.alert("Sorry, we haven't found any recipes for these filters.");
      }
      setApi(api.meals.slice(0, 12));
    } if (searchRadio === 'ingredient' && window.location.pathname === '/drinks') {
      const link = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;
      console.log(link);
      const api = await searchApi(link);
      console.log(api.drinks);
      if (api.drinks.length === 1) {
        history.push(`/drinks/${api.drinks[0].idDrink}`);
      } if (api.drinks.length === 0) {
        global.alert("Sorry, we haven't found any recipes for these filters.");
      }
      setApi(api.drinks.slice(0, 12));
    } if (searchRadio === 'name' && window.location.pathname === '/drinks') {
      const link = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
      console.log(link);
      const api = await searchApi(link);
      console.log(api.drinks);
      if (api.drinks.length === 1) {
        history.push(`/drinks/${api.drinks[0].idDrink}`);
      } if (api.drinks.length === 0) {
        global.alert("Sorry, we haven't found any recipes for these filters.");
      }
      setApi(api.drinks.slice(0, 12));
    } if (searchRadio === first && window.location.pathname === '/drinks') {
      const link = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`;
      console.log(link);
      const api = await searchApi(link);
      console.log(api.drinks);
      if (api.drinks.length === 1) {
        history.push(`/drinks/${api.drinks[0].idDrink}`);
      } if (api.drinks.length === 0) {
        global.alert("Sorry, we haven't found any recipes for these filters.");
      }
      setApi(api.drinks.slice(0, 12));
    }
  };

  return (
    <form>
      <input
        type="text"
        onChange={ (e) => setSearch(e.target.value) }
        data-testid="search-input"
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
