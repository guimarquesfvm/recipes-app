import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Loading from './Loading';

const limiter = 5;
const limiter2 = 12;
export default function CardReceitas() {
  const { toggleButton, toggleButtonAll, api,
    loading, page, categorysApi } = useContext(RecipesContext);

  // pega o storage para comparacao em casa do nao iniciar na rota /login
  const getStorage = JSON.parse(localStorage.getItem('user'));
  if (!getStorage) {
    localStorage.setItem('user', JSON.stringify({ email: '' }));
  }
  if (loading) {
    return <Loading />;
  }
  const pageName = (page === 'meals' && 'Meal') || (page === 'drinks' && 'Drink');
  // console.log(page, api[0]);
  return (

    <div>
      <label className="category-container">
        <button
          type="button"
          onClick={ toggleButtonAll }
          data-testid="All-category-filter"
        >
          All
        </button>
        {categorysApi.map((category, ind) => ind < limiter
        && (
          <button
            key={ ind }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ toggleButton }
            name={ category.strCategory }
          >
            {category.strCategory}

          </button>
        ))}
      </label>
      <div className="recipes-cards-container">
        {api.map((receita, index) => (index < limiter2
        && (
          <div
            key={ receita[`id${pageName}`] }
            data-testid={ `${index}-recipe-card` }
          >
            <Link
              to={ `/${page}/${receita[`id${pageName}`]}` }
              className="drink-card"
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ receita[`str${pageName}Thumb`] }
                alt={ receita[`str${pageName}`] }
              />
              <span
                data-testid={ `${index}-card-name` }
              >
                {receita[`str${pageName}`]}

              </span>
            </Link>
          </div>
        )
        ))}
      </div>
    </div>

  );
}
