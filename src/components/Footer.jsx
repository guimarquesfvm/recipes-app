import React, { useContext } from 'react';
import './Footer.css';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
// import DrinksContext from '../context/DrinksContext';
// import MealsContext from '../context/MealsContext';

function Footer() {
  const history = useHistory();
  const { setPage, setLoading } = useContext(RecipesContext);

  return (
    <footer
      className="footer"
      data-testid="footer"
    >
      <button
        src={ drinkIcon }
        alt="Juice"
        type="image"
        id="drink-button"
        data-testid="drinks-bottom-btn"
        disabled={ window.location.pathname === '/drinks' }
        onClick={ () => {
          setLoading(true);
          setPage('drinks');
          history.push('/drinks');
        } }
      >
        <img src={ drinkIcon } alt="Juice" />
      </button>
      <button
        src={ mealIcon }
        alt="Meal"
        type="button"
        id="meal-button"
        data-testid="meals-bottom-btn"
        disabled={ window.location.pathname === '/meals' }
        onClick={ () => {
          setLoading(true);
          setPage('meals');
          history.push('/meals');
        } }
      >
        <img src={ mealIcon } alt="Meal" />
      </button>
    </footer>
  );
}

export default Footer;
