import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import share from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

// function ShareRecipeButton({ dataId, type, id }) {
function ShareRecipeButton() {
  const location = useLocation();
  const [alert, setAlert] = useState('');
  // const handleCopy = (e) => {
  //   e.preventDefault();
  //   copy(`http://localhost:3000/${type}s/${id}`);
  //   setAlert('Link copied!');
  // };
  const handleCopy = () => {
    if (location.pathname.includes('/in-progress')) {
      copy(`http://localhost:3000${location.pathname.replace('/in-progress', '')}`);
      setAlert('Link copied!');
    } else {
      copy(`http://localhost:3000${location.pathname}`);
      setAlert('Link copied!');
    }
  };

  return (
    <>
      <button
        data-testid="share-btn"
        // data-testid={ dataId === 'share-btn' ? 'share-btn' : dataId }
        onClick={ handleCopy }
        src={ share }
        alt="Share button"
      >
        <img src={ share } alt="share recipe" />
      </button>
      <span>{alert}</span>
    </>
  );
}

export default ShareRecipeButton;

// ShareRecipeButton.propTypes = {
//   dataId: PropTypes.string,
//   type: PropTypes.string,
//   id: PropTypes.string,
// }.isRequired;
