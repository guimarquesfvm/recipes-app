import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/FavoriteRecipes.css';
import RecipesContext from '../context/RecipesContext';
import blackHeart from '../images/blackHeartIcon.svg';
import ShareRecipeButton from '../components/ShareRecipeButton';
import Header from '../components/Header';
import mealsButton from '../images/foodsButton.png';
import drinksButton from '../images/drinksButton.png';
import allButton from '../images/allButton.png';

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
      <div key={ i } className="card-favorite">
        <Link
          to={ `/${e.type}s/${e.id}` }
        >
          <img
            src={ e.image }
            alt="Foto da Receita"
            data-testid={ `${i}-horizontal-image` }
          />
        </Link>
        <div className="content-card-favorites">

          <div className="name-and-category-content">

            <Link
              to={ `/${e.type}s/${e.id}` }
              data-testid={ `${i}-horizontal-name` }
            >
              { e.name }
            </Link>
            <p data-testid={ `${i}-horizontal-top-text` }>
              { `${e.nationality} - ${e.category}` }
            </p>
            <p data-testid={ `${i}-horizontal-top-text` }>{ e.alcoholicOrNot }</p>
          </div>

          <div className="tags-button">
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
              width="35px"
            />
          </div>
        </div>
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
      <Header title="Favorite Recipes" />
      <form className="filter-favorite">
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => setFilterClick('Meals') }
        >
          <img src={ mealsButton } alt="Meals Button" />
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilterClick('Drinks') }
        >
          <img src={ drinksButton } alt="Drinks Button" />
        </button>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilterClick('All') }
        >
          <img src={ allButton } alt="All Button" />
        </button>
      </form>
      { start() }
    </div>
  );
}
