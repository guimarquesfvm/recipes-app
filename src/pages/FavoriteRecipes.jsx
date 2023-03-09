import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import blackHeart from '../images/blackHeartIcon.svg';
import ShareRecipeButton from '../components/ShareRecipeButton';

export default function DoneRecipes() {
  const [filterClick, setFilterClick] = useState('All');
  const getfavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const { setFavoriteRecipes } = useContext(RecipesContext);

  const filter = () => {
    if (filterClick === 'All') {
      return getfavoriteRecipes;
    } if (filterClick === 'Meals') {
      return getfavoriteRecipes.filter((element) => element.type === 'meal');
    } if (filterClick === 'Drinks') {
      return getfavoriteRecipes.filter((element) => element.type === 'drink');
    }
  };

  const handleRomoveFavorite = ({ target }) => {
    const favRemover = getfavoriteRecipes.filter(((element) => element.id
      !== target.name));
    localStorage.setItem('favoriteRecipes', JSON.stringify(favRemover));
    setFavoriteRecipes(favRemover);
  };
  const favoriteRecipesMap = () => {
    const array = filter();
    return array.map((e, i) => (
      <div key={ i }>
        <Link
          to={ `/${e.type}s/${e.id}` }
        >
          <img
            src={ e.image }
            alt="Foto da Receita"
            data-testid={ `${i}-horizontal-image` }
            width="300px"
          />
        </Link>
        <p data-testid={ `${i}-horizontal-top-text` }>
          { `${e.nationality} - ${e.category}` }
        </p>
        <Link
          to={ `/${e.type}s/${e.id}` }
          data-testid={ `${i}-horizontal-name` }
        >
          { e.name }
        </Link>
        <p data-testid={ `${i}-horizontal-top-text` }>{ e.alcoholicOrNot }</p>
        <ShareRecipeButton
          dataId={ `${i}-horizontal-share-btn` }
          type={ e.type }
          id={ e.id }
        />
        <input
          type="image"
          onClick={ handleRomoveFavorite }
          name={ e.id }
          src={ blackHeart }
          alt="blackHeart"
          data-testid={ `${i}-horizontal-favorite-btn` }
        />
      </div>
    ));
  };

  const start = () => {
    if (getfavoriteRecipes === null) {
      return;
    } if (getfavoriteRecipes !== null) {
      return favoriteRecipesMap();
    }
  };

  return (
    <div>
      <form>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => setFilterClick('Meals') }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilterClick('Drinks') }
        >
          Drinks
        </button>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilterClick('All') }
        >
          All
        </button>
        { start() }
      </form>
    </div>
  );
}
