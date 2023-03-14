import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function MealRecipeCardInProgress({ recipe, ingredients, measurements }) {
  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
  } = recipe;

  const history = useHistory();
  const [isRecipeFinished, setIsRecipeFinished] = useState(false);
  const [embedHTML, setEmbedHTML] = useState('');
  useEffect(() => {
    setEmbedHTML(String(strYoutube).replace('/watch?v=', '/embed/'));
  }, [strYoutube]);

  const [checkedList, setCheckedList] = useState(Array(ingredients.length).fill(false));

  // Salva o progresso da receita em andamento
  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    const savedList = inProgressRecipes.meals && inProgressRecipes.meals[recipe.idMeal];
    if (savedList) {
      setCheckedList(savedList);
    }
  }, [recipe.idMeal]);

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    const mealInProgress = { ...inProgressRecipes.meals, [recipe.idMeal]: checkedList };
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ ...inProgressRecipes, meals: mealInProgress }),
    );
  }, [checkedList, recipe.idMeal]);
  useEffect(() => {
    setIsRecipeFinished(checkedList.every((item) => item === true));
  }, [checkedList]);

  return (
    <div className="meal-recipe">
      <h3 data-testid="recipe-title" className="meal-name">{strMeal}</h3>
      <p data-testid="recipe-category">{strCategory}</p>
      <img
        className="meal-img"
        src={ strMealThumb }
        alt={ strMeal }
        style={ { width: 200 } }
        data-testid="recipe-photo"
      />
      <ul className="meal-list">
        {
          ingredients?.map((e, i) => (
            <label
              className="meal-label"
              key={ i }
              data-testid={ `${i}-ingredient-step` }
              style={ { textDecoration: checkedList[i]
                ? 'line-through solid rgb(0, 0, 0)' : 'none' } }
            >
              <input
                className="meal-checkbox"
                type="checkbox"
                checked={ checkedList[i] }
                onChange={ () => {
                  const newList = [...checkedList];
                  newList[i] = !newList[i];
                  setCheckedList(newList);
                } }
              />
              {`${e}  ${measurements[i] ? measurements[i] : ''}`}
            </label>
          ))
        }
      </ul>
      <div>
        <p data-testid="instructions">{strInstructions}</p>
        <iframe
          src={ embedHTML }
          title="instructions video"
          allowFullScreen
          data-testid="video"
        />
      </div>
      <button
        className="finish-btn"
        data-testid="finish-recipe-btn"
        disabled={ !isRecipeFinished }
        onClick={ () => history.push('/done-recipes') }
      >
        Finish Recipe
      </button>
    </div>
  );
}

MealRecipeCardInProgress.propTypes = {
  ingredients: PropTypes.array,
  measurements: PropTypes.any,
  recipe: PropTypes.shape({
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strYoutube: PropTypes.string,
  }),
}.isRequired;

export default MealRecipeCardInProgress;
