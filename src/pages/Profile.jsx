import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Profile() {
  const history = useHistory();
  return (
    <div>
      <Header title="Profile" />
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
        Favorites Recipes

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
      <Footer />
    </div>
  );
}
