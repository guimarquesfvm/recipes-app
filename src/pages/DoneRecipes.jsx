import React, { useEffect } from 'react';
import share from '../images/shareIcon.svg';

export default function DoneRecipes() {
  useEffect(() => {
    const obj = [
      {
        alcoholicOrNot: '',
        category: 'Vegetarian',
        doneDate: '23/06/2020',
        id: '52771',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        name: 'Spicy Arrabiata Penne',
        nationality: 'Italian',
        tags: ['Pasta', 'Curry'],
        type: 'meal',
      },
      {
        alcoholicOrNot: 'Alcoholic',
        category: 'Cocktail',
        doneDate: '23/06/2020',
        id: '178319',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        name: 'Aquamarine',
        nationality: '',
        tags: [],
        type: 'drink',
      },
    ];

    const objJSON = JSON.stringify(obj);

    localStorage.setItem('doneRecipes', objJSON);
  }, []);

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  const doneRecipesMap = () => doneRecipes.map((e, i) => (
    <div key={ i } href={ `/${e.type}s/${e.id}` }>
      <img
        src={ e.image }
        alt="Foto da Receita"
        data-testid={ `${i}-horizontal-image` }
        width="300px"
      />
      <p data-testid={ `${i}-horizontal-top-text` }>
        { `${e.nationality} - ${e.category}` }
      </p>
      <p data-testid={ `${i}-horizontal-name` }>{ e.name }</p>
      <p data-testid={ `${i}-horizontal-done-date` }>{ e.doneDate }</p>
      <p data-testid={ `${i}-horizontal-top-text` }>{ e.alcoholicOrNot }</p>
      <button
        type="button"
        data-testid={ `${i}-horizontal-share-btn` }
        src={ share }
      >
        Share
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

  const start = () => {
    if (doneRecipes === null) {
      return;
    } if (doneRecipes !== null) {
      return doneRecipesMap();
    }
  };

  return (
    <div>
      <form>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
        { start() }
      </form>
    </div>
  );
}
