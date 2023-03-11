import React, { useState } from 'react';
import PropTypes from 'prop-types';
import share from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareRecipeButton({ dataId, type, id }) {
  const [alert, setAlert] = useState('');

  // const handleCopy = () => {
  //   if (location.pathname.includes('/in-progress')) {
  //     copy(`http://localhost:3000${location.pathname.replace('/in-progress', '')}`);
  //     setAlert('Link copied!');
  //   } else {
  //     copy(`http://localhost:3000${location.pathname}`);
  //     setAlert('Link copied!');
  //   }

  const handleCopy = (e) => {
    e.preventDefault();
    copy(`http://localhost:3000/${type}s/${id}`);
    setAlert('Link copied!');
  };

  // const handleCopy = () => {
  //   if (location.pathname.includes('/in-progress')) {
  //     copy(`http://localhost:3000${location.pathname.replace('/in-progress', '')}`);
  //     setAlert('Link copied!');
  //   } else {
  //     copy(`http://localhost:3000${location.pathname}`);
  //     setAlert('Link copied!');
  //   }
  // };

  return (
    <>
      <input
        type="image"
        // data-testid="share-btn"
        data-testid={ dataId === 'share-btn' ? 'share-btn' : dataId }
        src={ share }
        alt="Share button"
        onClick={ handleCopy }
      />
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
