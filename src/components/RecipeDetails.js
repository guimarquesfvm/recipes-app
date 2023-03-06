import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import recipeDetailsAPI from '../helpers/recipeDetailsAPI';
import MealRecipeCard from './MealRecipeCard';
import DrinkRecipeCard from './DrinkRecipeCard';
import recomendationsAPI from '../helpers/recomendationsAPI';
import DrinkRecomendations from './DrinkRecomendations';
import MealRecomendations from './MealRecomendations';
import StartRecipeButton from './StartRecipeButton';

function RecipeDetails(props) {
  const { match: { url, params: { id } } } = props;

  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const SIX = 6;
  useEffect(() => {
    if (url.includes('meals')) {
      recomendationsAPI('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((data) => setRecomendations(data.drinks.slice(0, SIX)));
      recipeDetailsAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((data) => {
          setRecipe(data.meals[0]);
          setIngredients(
            Object.entries(data.meals[0])
              .filter((e) => e[0].includes('strIngredient')
                && (e[1] !== null && e[1] !== '')),
          );
          setMeasurements(
            Object.entries(data.meals[0])
              .filter((e) => e[0].includes('strMeasure')
                && (e[1] !== null && e[1] !== '')),
          );
        });
    } else if (url.includes('drinks')) {
      recomendationsAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((data) => setRecomendations(data.meals.slice(0, SIX)));
      recipeDetailsAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((data) => {
          setRecipe(data.drinks[0]);
          setIngredients(
            Object.entries(data.drinks[0])
              .filter((e) => e[0].includes('strIngredient')
                && (e[1] !== null && e[1] !== '')),
          );
          setMeasurements(
            Object.entries(data.drinks[0])
              .filter((e) => e[0].includes('strMeasure')
                && (e[1] !== null && e[1] !== '')),
          );
        });
    }
  }, [url, id]);

  // useEffect(() => console.log(recipe), [recipe]);
  // useEffect(() => console.log(ingredients), [ingredients]);
  // useEffect(() => console.log(measurements), [measurements]);
  // useEffect(() => console.log(recomendations), [recomendations]);

  return (
    <div>
      <h1>
        Recipe Details
      </h1>
      <div>
        {url.includes('meals') ? (
          <>
            <MealRecipeCard
              recipe={ recipe }
              ingredients={ ingredients }
              measurements={ measurements }
            />
            <DrinkRecomendations recomendations={ recomendations } />
            <StartRecipeButton recipeID={ recipe.idMeal } category="meals" />
          </>
        ) : (
          <>
            <DrinkRecipeCard
              recipe={ recipe }
              ingredients={ ingredients }
              measurements={ measurements }
            />
            <MealRecomendations recomendations={ recomendations } />
            <StartRecipeButton recipeID={ recipe.idDrink } category="drinks" />
          </>
        )}
      </div>
    </div>
  );
}

RecipeDetails.propTypes = {
  history: PropTypes.any,
}.isRequired;

export default RecipeDetails;
