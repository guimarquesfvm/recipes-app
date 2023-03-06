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
        type="button"
        id="drink-button"
        data-testid="drinks-bottom-btn"
        onClick={ () => {
          setLoading(true);
          // setPage('drinks');
          history.push('/Drinks');
        } }
      >
        <img src={ drinkIcon } alt="Juice" />
      </button>
      <button
        type="button"
        id="meal-button"
        data-testid="meals-bottom-btn"
        onClick={ () => {
          setLoading(true);
          setPage('meals');
          history.push('/Meals');
        } }
      >
        <img src={ mealIcon } alt="Meal" />
      </button>
    </footer>
  );
}

export default Footer;
