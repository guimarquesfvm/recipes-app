import PropTypes from 'prop-types';
import React from 'react';

function FavoriteRecipeButton({ recipe, category }) {
  const handleFavorite = () => {
    const toSave = [{
      id: recipe.idMeal || recipe.idDrink,
      type: category,
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
    }];
    // console.log(recipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(toSave));
  };

  return (
    <button
      data-testid="favorite-btn"
      onClick={ handleFavorite }
    >
      Favorite Recipe
    </button>
  );
}

FavoriteRecipeButton.propTypes = {
  recipe: PropTypes.any,
}.isRequired;

export default FavoriteRecipeButton;
