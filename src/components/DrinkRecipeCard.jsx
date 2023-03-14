import PropTypes from 'prop-types';
// import React, { useEffect } from 'react';

function DrinkRecipeCard({ recipe, ingredients, measurements }) {
  // useEffect(() => console.log(recipe), [recipe]);
  // useEffect(() => console.log(ingredients), [ingredients]);
  // useEffect(() => console.log(measurements), [measurements]);

  const {
    strDrinkThumb,
    strDrink,
    strInstructions,
    strAlcoholic,
  } = recipe;
  return (
    <div>
      <div className="apresentation-container">
        <h1 data-testid="recipe-title" className="recipe-title">{strDrink}</h1>
        <img
          src={ strDrinkThumb }
          alt={ strDrink }
          data-testid="recipe-photo"
          className="recipe-photo"
        />
      </div>
      <p data-testid="recipe-category" className="recipe-category">{strAlcoholic}</p>
      <h2 className="tag-h2"><b>Ingredients</b></h2>
      <ul className="ingredients-container">
        {
          ingredients?.map((e, i) => (
            <li
              key={ i }
              data-testid={ `${i}-ingredient-name-and-measure` }
              className="ingredient-li"
            >
              {`${e[1]} - ${measurements[i] ? measurements[i][1] : ''}`}
            </li>
          ))
        }
      </ul>
      <h2 className="tag-h2"><b>Instructions</b></h2>
      <div className="instructions-container">
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
