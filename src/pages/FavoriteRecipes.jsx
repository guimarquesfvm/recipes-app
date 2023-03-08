import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import share from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [linkCopied, setLinkCopied] = useState(false);
  const [filterClick, setFilterClick] = useState('All');

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  function onClickShare(element) {
    const copyText = `${window.location.origin}/${element.type}s/${element.id}`;

    navigator.clipboard.writeText(copyText);

    // console.log(copyText);

    return setLinkCopied(true);
  }

  const filter = () => {
    if (filterClick === 'All') {
      return doneRecipes;
    } if (filterClick === 'Meals') {
      return doneRecipes.filter((element) => element.type === 'meal');
    } if (filterClick === 'Drinks') {
      return doneRecipes.filter((element) => element.type === 'drink');
    }
  };

  const doneRecipesMap = () => {
    const array = filter();
    const cards = array.map((e, i) => (
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
          <button>
            {/* {favorite ? <img src="blackHeart" alt="blackheart" /> : <img src="whiteheart" alt="whiteheart" />} */}
          </button>
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
        <button
          type="button"
          data-testid={ `${i}-horizontal-share-btn` }
          src={ share }
          onClick={ () => onClickShare(e) }
        >
          <img src={ share } alt="Share button" />
        </button>
        { e.tags.map((elem, ind) => (
          <div
            key={ ind }
            data-testid={ `0-${elem}-horizontal-tag` }
          >
            {elem}
          </div>)) }
      </div>
    ));
    return cards;
  };

  const start = () => {
    if (doneRecipes === null) {
      return;
    } if (doneRecipes !== null) {
      return doneRecipesMap();
    }
  };

  const linkCopiedFunc = () => {
    if (linkCopied === true) {
      return <p>Link copied!</p>;
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
        { linkCopiedFunc() }
        { start() }
      </form>
    </div>
  );
}
