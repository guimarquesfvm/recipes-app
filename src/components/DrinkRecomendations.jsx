import PropTypes from 'prop-types';
import React from 'react';

function DrinkRecomendations({ recomendations }) {
  return (
    <ul className="caroussel-container">
      {
        recomendations.map((card, i) => (
          <li
            key={ card.idDrink }
            data-testid={ `${i}-recommendation-card` }
            className="recomendation-card"
          >
            <img
              src={ card.strDrinkThumb }
              alt={ card.strDrink }
              style={ { width: 130 } }
            />
            <b data-testid={ `${i}-recommendation-title` }>{card.strDrink}</b>
          </li>
        ))
      }
    </ul>
  );
}

DrinkRecomendations.propTypes = {
  recomendations: PropTypes.any,
}.isRequired;

export default DrinkRecomendations;
