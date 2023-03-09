import React, { useState } from 'react';
// import PropTypes from 'prop-types';
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
      <input
        type="image"
        // data-testid="share-btn"
        data-testid={ dataId || 'share-btn' }
        src={ share }
        alt="Share button"
        onClick={ handleCopy }
      />
      <span>{alert}</span>
    </>
  );
}

export default ShareRecipeButton;
// ShareRecipeButton.propTypes = {
//   dataId: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
//   id: PropTypes.string.isRequired,
// };
