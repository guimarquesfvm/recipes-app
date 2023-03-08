import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

function Header({ title }) {
  const [showBar, setShowBar] = useState(false);
  // Estado usado para esconder a barra
  const history = useHistory();
  return (
    <header>
      <h1>Recipes App</h1>
      <div>
        <button data-testid="search-top-btn" onClick={ () => { setShowBar(!showBar); } }>
          <img src={ searchIcon } alt="Search Icon" />
        </button>
        <button
          data-testid="profile-top-btn"
          onClick={ () => { history.push('/profile'); } }
        >
          <img src={ profileIcon } alt="Profile Icon" />
        </button>
      </div>
      <div>
        <h3>{ title }</h3>
      </div>
      {
        showBar
          ? <SearchBar /> : null
      }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
