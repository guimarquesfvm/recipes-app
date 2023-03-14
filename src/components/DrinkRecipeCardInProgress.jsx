import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function DrinkRecipeCardInProgress({ recipe, ingredients, measurements }) {
  const {
    strDrinkThumb,
    strDrink,
    strCategory,
    strInstructions,
  } = recipe;

  const history = useHistory();
  const [checkedList, setCheckedList] = useState(Array(ingredients.length).fill(false));

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    const savedList = inProgressRecipes.drinks
    && inProgressRecipes.drinks[recipe.idDrink];
    if (savedList) {
      setCheckedList(savedList);
    }
  }, [recipe.idDrink]);

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    const drinkInProgress = { ...inProgressRecipes.drinks,
      [recipe.idDrink]: checkedList };
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ ...inProgressRecipes, drinks: drinkInProgress }),
    );
  }, [checkedList, recipe.idDrink]);

  const isRecipeFinished = checkedList.every(Boolean);

  return (
    <div className="drink-recipe">
      <h3 data-testid="recipe-title" className="drink-name">{strDrink}</h3>
      <p data-testid="recipe-category">{strCategory}</p>

      <img
        className="drink-img"
        src={ strDrinkThumb }
        alt={ strDrink }
        style={ { width: 200 } }
        data-testid="recipe-photo"
      />
      <ul className="drink-list">
        {
          ingredients?.map((e, i) => (
            <label
              className="drink-label"
              key={ i }
              data-testid={ `${i}-ingredient-step` }
              style={ { textDecoration: checkedList[i]
                ? 'line-through solid rgb(0, 0, 0)' : 'none' } }
            >
              <input
                className="drink-checkbox"
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

DrinkRecipeCardInProgress.propTypes = {
  ingredients: PropTypes.array,
  measurements: PropTypes.any,
  recipe: PropTypes.shape({
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strInstructions: PropTypes.string,
    strYoutube: PropTypes.string,
    idDrink: PropTypes.string,
  }),
}.isRequired;

export default DrinkRecipeCardInProgress;
