import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import recipeDetailsAPI from '../helpers/recipeDetailsAPI';
import MealRecipeCardInProgress from '../components/MealRecipeCardInProgress';
import DrinkRecipeCardInProgress from '../components/DrinkRecipeCardInProgress';
import ShareRecipeButton from '../components/ShareRecipeButton';
import FavoriteRecipeButton from '../components/FavoriteRecipeButton';
import '../style/RecipeInProgress.css';

function RecipeInProgress(props) {
  const { match: { url, params: { id } } } = props;
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    if (!id) return;

    const apiURL = url.includes('meals')
      ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

    const getIngredientsAndMeasurements = (data, key) => Object
      .entries(data[url.includes('meals') ? 'meals' : 'drinks'][0])
      .filter((e) => e[0].includes(key) && (e[1] !== null && e[1] !== ''))
      .map((e) => e[1]);

    recipeDetailsAPI(apiURL).then((data) => {
      setRecipe(data[url.includes('meals') ? 'meals' : 'drinks'][0]);
      setIngredients(getIngredientsAndMeasurements(data, 'strIngredient'));
      setMeasurements(getIngredientsAndMeasurements(data, 'strMeasure'));
    });
  }, [url, id]);

  return (
    <div>
      <div className="recipe-container">
        {url.includes('meals') ? (
          <>
            <MealRecipeCardInProgress
              className="recipe-card"
              recipe={ recipe }
              ingredients={ ingredients }
              measurements={ measurements }
            />
            <div className="icons">
              <FavoriteRecipeButton recipe={ recipe } category="meal" />
              <ShareRecipeButton
                dataId="share-btn"
                id={ id }
                type="meal"
              />
            </div>
          </>
        ) : (
          <>
            <DrinkRecipeCardInProgress
              className="recipe-card"
              recipe={ recipe }
              ingredients={ ingredients }
              measurements={ measurements }
            />
            <div className="icons">
              <FavoriteRecipeButton recipe={ recipe } category="drink" />
              <ShareRecipeButton
                dataId="share-btn"
                id={ id }
                type="drink"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

RecipeInProgress.propTypes = {
  history: PropTypes.any,
}.isRequired;

export default RecipeInProgress;
