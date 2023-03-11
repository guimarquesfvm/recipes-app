import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const copy = require('clipboard-copy');

function ShareRecipeButton() {
  const location = useLocation();
  const [alert, setAlert] = useState('');

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
        onClick={ handleCopy }
      >
        Share Recipe
      </button>
      <span>{alert}</span>
    </>
  );
}

export default ShareRecipeButton;
