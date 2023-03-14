import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
// import { Redirect } from 'react-router-dom';
import recipeDetailsAPI from '../helpers/recipeDetailsAPI';
import MealRecipeCardInProgress from '../components/MealRecipeCardInProgress';
import DrinkRecipeCardInProgress from '../components/DrinkRecipeCardInProgress';
import ShareRecipeButton from '../components/ShareRecipeButton';
import FavoriteRecipeButton from '../components/FavoriteRecipeButton';

function RecipeInProgress(props) {
  const { match: { url, params: { id } } } = props;
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  // const [redirect, setRedirect] = useState(false);

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

  const isRecipeFinished = ingredients.every((_, index) => {
    const savedList = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    const savedIngredients = savedList[url.includes('meals') ? 'meals' : 'drinks']?.[id];
    return savedIngredients?.[index] ?? false;
  });

  // const handleFinishBtn = () => {
  //   const savedList = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  //   const recipeType = url.includes('meals') ? 'meals' : 'drinks';
  //   const recipeObj = {
  //     id: recipe.id,
  //     type: recipeType,
  //     area: recipe.strArea || '',
  //     category: recipe.strCategory,
  //     alcoholicOrNot: recipe.strAlcoholic || '',
  //     name: recipe.strMeal || recipe.strDrink,
  //     image: recipe.strMealThumb || recipe.strDrinkThumb,
  //     doneDate: new Date().toLocaleDateString('pt-BR'),
  //     tags: recipe.strTags ? recipe.strTags.split(',') : [],
  //   };
  //   localStorage.setItem('doneRecipes', JSON.stringify([...savedList, recipeObj]));
  //   setRedirect(true);
  //   if (redirect) history.push('/done-recipes');
  // };

  return (
    <div>
      <h1>Recipe in Progress</h1>
      <div>
        {url.includes('meals') ? (
          <>
            <MealRecipeCardInProgress
              recipe={ recipe }
              ingredients={ ingredients }
              measurements={ measurements }
            />
            <FavoriteRecipeButton recipe={ recipe } category="meal" />
            <ShareRecipeButton
              dataId="share-btn"
            />
          </>
        ) : (
          <>
            <DrinkRecipeCardInProgress
              recipe={ recipe }
              ingredients={ ingredients }
              measurements={ measurements }
            />
            <FavoriteRecipeButton recipe={ recipe } category="drink" />
            <ShareRecipeButton dataId="share-btn" />
          </>
        )}
      </div>
      <div style={ { position: 'fixed', bottom: 0, left: 0, right: 0 } }>
        <button
          data-testid="finish-recipe-btn"
          disabled={ !isRecipeFinished }
          // onClick={ handleFinishBtn }
        >
          Finish Recipe
        </button>
      </div>
    </div>
  );
}

RecipeInProgress.propTypes = {
  history: PropTypes.any,
}.isRequired;

export default RecipeInProgress;
