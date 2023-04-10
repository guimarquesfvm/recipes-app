import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import logoApp from '../images/Group 4.png';
import '../style/Header.css';

function Header(props) {
  const [showBar, setShowBar] = useState(false);
  const { title } = props;
  const ValidateHeader = title === 'Profile'
  || title === 'Done Recipes' || title === 'Favorite Recipes';
  // Estado usado para esconder a barra
  const history = useHistory();
  return (
    <header className="header">
      <div className="header-container">
        <button onClick={ () => history.push('/meals') }>
          <img src={ logoApp } alt="voltar à tela principal" />
        </button>
        <h1 className="header-recipe-app">RECIPES</h1>
        <h1 className="header-recipe-app2">app</h1>
        <div className="header-icons">
          {ValidateHeader ? ''
            : (
              <input
                className="header-input"
                type="image"
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="Search Icon"
                onClick={ (e) => {
                  e.preventDefault();
                  setShowBar(!showBar);
                } }
              />
            )}

          <input
            className="header-profile"
            type="image"
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Profile Icon"
            onClick={ (e) => {
              e.preventDefault();
              history.push('/profile');
            } }
          />

        </div>
        <div />
      </div>
      {
        showBar
          ? <SearchBar /> : null
      }
      <h3 className="header-page-title" data-testid="page-title">{ title }</h3>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
