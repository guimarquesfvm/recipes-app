import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import recipeDetailsAPI from '../helpers/recipeDetailsAPI';

function RecipeDetails(props) {
  const { match: { url, params: { id } } } = props;

  const [meal, setMeal] = useState({});

  useEffect(() => { // corrigir ENDPOINTS!!!!
    if (url.includes('meals')) {
      recipeDetailsAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((data) => setMeal(data.meals[0]));
    } else if (url.includes('drinks')) {
      recipeDetailsAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((data) => setMeal(data.drinks[0]));
    }
  }, [url, id]);

  useEffect(() => console.log(meal), [meal]);

  return (
    <div>
      <h1>
        Recipe Details
      </h1>
    </div>
  );
}

RecipeDetails.propTypes = {
  history: PropTypes.any,
}.isRequired;

export default RecipeDetails;
