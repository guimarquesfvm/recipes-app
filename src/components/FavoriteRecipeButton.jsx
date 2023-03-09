import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

function FavoriteRecipeButton({ recipe, category }) {
  const toSave = {
    id: recipe.idMeal || recipe.idDrink,
    type: category,
    nationality: recipe.strArea || '',
    category: recipe.strCategory || '',
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe.strMeal || recipe.strDrink,
    image: recipe.strMealThumb || recipe.strDrinkThumb,
  };

  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavoriteRecipes(local);
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  const handleFavorite = () => {
    const some = favoriteRecipes?.some((el) => el.id === toSave.id);
    if (some) {
      const newArr = favoriteRecipes.filter((el) => el.id !== toSave.id);
      setFavoriteRecipes(newArr);
    } else {
      const newArr = [...favoriteRecipes, toSave];
      setFavoriteRecipes(newArr);
    }
  };

  return (
    <div>
      { recipe
      && (
        <button
          onClick={ handleFavorite }
          src={
            favoriteRecipes?.some((el) => el.id === toSave.id) ? blackHeart : whiteHeart
          }
          data-testid="favorite-btn"
        >
          <img
            src={
              favoriteRecipes?.some((el) => el.id === toSave.id) ? blackHeart : whiteHeart
            }
            alt="favorite-heart"
          />
        </button>
      )}
    </div>
  );
}

FavoriteRecipeButton.propTypes = {
  recipe: PropTypes.any,
}.isRequired;

export default FavoriteRecipeButton;