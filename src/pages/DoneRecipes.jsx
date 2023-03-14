import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import share from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [linkCopied, setLinkCopied] = useState(false);
  const [filterClick, setFilterClick] = useState('All');

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  // console.log(doneRecipes);

  const onClickShare = async (element) => {
    const copyText = `${window.location.origin}/${element.type}s/${element.id}`;
    try {
      await navigator.clipboard.writeText(copyText);
    } catch (e) {
      console.log(e);
    }

    // console.log(copyText);

    setLinkCopied(true);
  };

  const filter = () => {
    if (filterClick === 'Meals') {
      return doneRecipes.filter((element) => element.type === 'meal');
    } if (filterClick === 'Drinks') {
      // console.log('to nos drinks');
      return doneRecipes.filter((element) => element.type === 'drink');
    }
    return doneRecipes;
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
        <p data-testid={ `${i}-horizontal-done-date` }>{ e.doneDate }</p>
        <p data-testid={ `${i}-horizontal-top-text` }>{ e.alcoholicOrNot }</p>
        <input
          type="image"
          data-testid={ `${i}-horizontal-share-btn` }
          src={ share }
          alt="share"
          onClick={ (ev) => {
            ev.preventDefault();
            onClickShare(e);
          } }
        />
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
      return <p>You have no completed recipes.</p>;
    }
    return doneRecipesMap();
  };

  const link = () => {
    if (linkCopied === true) {
      return <p data-testid="link">Link copied!</p>;
    }
    return <p data-testid="link" />;
  };

  return (
    <div>
      <Header title="Done Recipes" />
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
        { link() }
        { start() }
      </form>
    </div>
  );
}
