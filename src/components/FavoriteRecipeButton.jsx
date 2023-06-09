import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

function FavoriteRecipeButton({ recipe, category, obj }) {
  const toSave = {
    id: recipe.idMeal || recipe.idDrink,
    type: category,
    nationality: recipe.strArea || '',
    category: recipe.strCategory || '',
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe.strMeal || recipe.strDrink,
    image: recipe.strMealThumb || recipe.strDrinkThumb,
  };

  const { favoriteRecipes, setFavoriteRecipes } = useContext(RecipesContext);

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
      const newArr = favoriteRecipes.filter((el) => (el.id !== toSave.id)
      || (obj && (el.id !== obj.id)));
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
          data-testid="favorite-btn"
          alt="favorite-heart"
          width="35px"
        >
          <img
            src={
              favoriteRecipes?.some((el) => el.id === toSave.id) ? blackHeart : whiteHeart
            }
            alt="favoritar/desfavoritar receita"
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
