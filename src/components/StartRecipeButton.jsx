import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function StartRecipeButton({ recipeID, category }) {
  const [buttonText, setButtonText] = useState('Start Recipe');

  useEffect(() => {
    // testa se a recipe atual está no array de doneRecipes (localStorage)
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      const isDone = doneRecipes.some((el) => Number(el.id) === Number(recipeID));
      if (isDone) setButtonText('');
    }
    // testa se a recipe atual está no array de doneRecipes (localStorage)
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes) {
      const inProgressIdsArray = Object.keys(inProgressRecipes[category]);
      const isInProgress = inProgressIdsArray
        .some((el) => Number(el) === Number(recipeID));
      if (isInProgress) setButtonText('Continue Recipe');
    }
  }, [recipeID, category]);

  return (
    (buttonText === '') ? null : (
      <Link to={ `/${category}/${recipeID}/in-progress` }>
        <button
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
        >
          {buttonText}
        </button>
      </Link>
    )
  );
}

export default StartRecipeButton;

StartRecipeButton.propTypes = {
  recipe: PropTypes.string,
}.isRequired;
