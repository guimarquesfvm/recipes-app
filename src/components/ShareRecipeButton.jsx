import React, { useState } from 'react';
import PropTypes from 'prop-types';
import share from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareRecipeButton({ dataId, type, id }) {
  const [alert, setAlert] = useState('');
  const handleCopy = (e) => {
    e.preventDefault();
    copy(`http://localhost:3000/${type}s/${id}`);
    setAlert('Link copied!');
  };

  return (
    <>
      <button
        data-testid={ dataId === 'share-btn' ? 'share-btn' : dataId }
        onClick={ handleCopy }
        src={ share }
        alt="Share button"
      >
        Share Recipe
      </button>
      <span>{alert}</span>
    </>
  );
}

export default ShareRecipeButton;

ShareRecipeButton.propTypes = {
  dataId: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
}.isRequired;