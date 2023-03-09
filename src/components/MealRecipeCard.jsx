import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

function MealRecipeCard({ recipe, ingredients, measurements }) {
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
          ingredients.map((e, i) => (
            <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
              {`${e[1]} - ${measurements[i][1]}`}
            </li>
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
    </div>
  );
}

MealRecipeCard.propTypes = {
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

export default MealRecipeCard;
