import PropTypes from 'prop-types';
import React from 'react';

function MealRecomendations({ recomendations }) {
  return (
    <ul className="caroussel-container">
      {
        recomendations.map((card, i) => (
          <li key={ card.idMeal } data-testid={ `${i}-recommendation-card` }>
            <img
              src={ card.strMealThumb }
              alt={ card.strMeal }
              style={ { width: 130 } }
            />
            <b data-testid={ `${i}-recommendation-title` }>{card.strMeal}</b>
          </li>
        ))
      }
    </ul>
  );
}

MealRecomendations.propTypes = {
  recomendations: PropTypes.any,
}.isRequired;

export default MealRecomendations;
