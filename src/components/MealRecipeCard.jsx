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
      <div className="apresentation-container">
        <h1 data-testid="recipe-title" className="recipe-title">{strMeal}</h1>
        <img
          src={ strMealThumb }
          alt={ strMeal }
          data-testid="recipe-photo"
          className="recipe-photo"
        />
      </div>
      <p data-testid="recipe-category" className="recipe-category">{strCategory}</p>
      <h2 className="tag-h2"><b>Ingredients</b></h2>
      <ul className="ingredients-container">
        {
          ingredients.map((e, i) => (
            <li
              key={ i }
              data-testid={ `${i}-ingredient-name-and-measure` }
              className="ingredient-li"
            >
              {`${e[1]} - ${measurements[i][1]}`}
            </li>
          ))
        }
      </ul>
      <h2 className="tag-h2"><b>Instructions</b></h2>
      <div className="instructions-container">
        <p data-testid="instructions">{strInstructions}</p>
        <h2 className="tag-h2"><b>Video</b></h2>
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
