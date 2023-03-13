import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import share from '../images/shareIcon.svg';
import '../style/DoneRecipes.css';
import mealsButton from '../images/foodsButton.png';
import drinksButton from '../images/drinksButton.png';
import allButton from '../images/allButton.png';

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
      <div key={ i } className="card-done">
        <Link
          to={ `/${e.type}s/${e.id}` }
        >
          <img
            src={ e.image }
            alt="Foto da Receita"
            data-testid={ `${i}-horizontal-image` }
            height="150px"
          />
        </Link>
        <div className="espec-card">
          <Link
            to={ `/${e.type}s/${e.id}` }
            data-testid={ `${i}-horizontal-name` }
          >
            { e.name }
          </Link>
          <p data-testid={ `${i}-horizontal-top-text` }>
            { `${e.nationality} - ${e.category}` }
          </p>
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
          <div className="tags">
            { e.tags.map((elem, ind) => (
              <div
                key={ ind }
                data-testid={ `0-${elem}-horizontal-tag` }
              >
                {elem}
              </div>)) }
          </div>
        </div>
      </div>
    ));
    return cards;
  };

  const start = () => {
    if (doneRecipes === null) {
      return <p className="pL">You have no completed recipes.</p>;
    }
    return doneRecipesMap();
  };

  const link = () => {
    if (linkCopied === true) {
      return <p data-testid="link" className="pL">Link copied!</p>;
    }
    return <p data-testid="link" className="pL" />;
  };

  return (
    <div>
      <Header title="Done Recipes" />
      <form className="filter-done">
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => setFilterClick('Meals') }
        >
          <img src={ mealsButton } alt="Meals Button" />
          {/* Meals */}
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilterClick('Drinks') }
        >
          <img src={ drinksButton } alt="Meals Button" />
          {/* Drinks */}
        </button>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilterClick('All') }
        >
          <img src={ allButton } alt="Meals Button" />
          {/* All */}
        </button>
      </form>
      { link() }
      { start() }
    </div>
  );
}
