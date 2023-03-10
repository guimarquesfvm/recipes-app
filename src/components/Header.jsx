import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

function Header({ title }) {
  const [showBar, setShowBar] = useState(false);
  const ValidateHeader = title === 'Profile'
  || title === 'Done Recipes' || title === 'Favorite Recipes';
  // Estado usado para esconder a barra
  const history = useHistory();
  return (
    <header>
      <h1>Recipes App</h1>
      <div>
        {ValidateHeader ? ''
          : (
            <input
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
      <div>
        <h3 data-testid="page-title">{ title }</h3>
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
