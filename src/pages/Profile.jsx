import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Profile() {
  const history = useHistory();
  return (
    <div>
      Profile
      <h2
        data-testid="profile-email"
      >
        {JSON.parse(localStorage.getItem('user')).email}
      </h2>

      <button
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes

      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes

      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      >
        Logout

      </button>
    </div>
  );
}
