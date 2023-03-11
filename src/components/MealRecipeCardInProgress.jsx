import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

function MealRecipeCardInProgress({ recipe, ingredients, measurements }) {
  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
  } = recipe;

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

  const isRecipeFinished = checkedList.every(Boolean);

  return (
    <div>
      <h3 data-testid="recipe-title">{strMeal}</h3>
      <p data-testid="recipe-category">{strCategory}</p>
      <img
        src={ strMealThumb }
        alt={ strMeal }
        style={ { width: 200 } }
        data-testid="recipe-photo"
      />
      <ul>
        {
          ingredients?.map((e, i) => (
            <label
              key={ i }
              data-testid={ `${i}-ingredient-step` }
              style={ { textDecoration: checkedList[i]
                ? 'line-through solid rgb(0, 0, 0)' : 'none' } }
            >
              <input
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
        data-testid="finish-recipe-btn"
        disabled={ !isRecipeFinished }
      >
        Finalizar Receita
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
