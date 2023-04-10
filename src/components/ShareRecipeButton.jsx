import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import share from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

// function ShareRecipeButton({ dataId, type, id }) {
function ShareRecipeButton({ dataId, type, id }) {
  const [alert, setAlert] = useState('');
  const location = useLocation();
  const copyLink = 'Link copied!';

  const handleCopy = (e) => {
    e.preventDefault();
    copy(`http://localhost:3000/${type}s/${id}`);
    setAlert(copyLink);
  };

  const handleCopy2 = () => {
    if (location.pathname.includes('/in-progress')) {
      copy(`http://localhost:3000${location.pathname.replace('/in-progress', '')}`);
      setAlert(copyLink);
    } else {
      copy(`http://localhost:3000${location.pathname}`);
      setAlert(copyLink);
    }
  };

  return (
    <>
      {dataId === 'share-btn'
        ? (
          <button
            // data-testid="share-btn"
            data-testid="share-btn"
            onClick={ handleCopy2 }
            src={ share }
            alt="Share button"
            width="35px"
          >
            <img src={ share } alt="" />
          </button>
        )
        : (
          <button
            // data-testid="share-btn"
            data-testid={ dataId }
            onClick={ handleCopy }
            alt="Share button"
            width="35px"
          >
            <img src={ share } alt="compartilhar receita" />
          </button>
        )}

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
