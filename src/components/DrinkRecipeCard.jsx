import PropTypes from 'prop-types';
import React from 'react';

function DrinkRecipeCard({ recipe, ingredients, measurements }) {
  const {
    strDrinkThumb,
    strDrink,
    strInstructions,
    strAlcoholic,
  } = recipe;
  return (
    <div>
      <h3 data-testid="recipe-title">{strDrink}</h3>
      <p data-testid="recipe-category">{strAlcoholic}</p>

      <img
        src={ strDrinkThumb }
        alt={ strDrink }
        style={ { width: 200 } }
        data-testid="recipe-photo"
      />
      <ul>
        {
          ingredients.map((e, i) => (
            <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
              {`${e[1]} - ${measurements[i][1]} ${i}`}
            </li>
          ))
        }
      </ul>
      <div>
        <p data-testid="instructions">{strInstructions}</p>
      </div>
    </div>
  );
}

DrinkRecipeCard.propTypes = {
  ingredients: PropTypes.any,
  measurements: PropTypes.any,
  recipe: PropTypes.any,
}.isRequired;

export default DrinkRecipeCard;
