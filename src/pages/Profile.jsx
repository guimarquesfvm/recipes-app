import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../style/Profile.css';
import icon from '../images/profileIcon.svg';
import heart from '../images/blackHeartIcon.svg';
import logout from '../images/logout.svg';
import check from '../images/checkmark.svg';

export default function Profile() {
  const history = useHistory();
  // pega o storage para comparacao em casa do nao iniciar na rota /login
  const getStorage = JSON.parse(localStorage.getItem('user'));
  if (!getStorage) {
    localStorage.setItem('user', JSON.stringify({ email: '' }));
  }

  return (
    <div className="profile-content">
      <Header title="Profile" />
      <img className="img-profile" src={ icon } alt="Profile" />
      <h2
        data-testid="profile-email"
      >
        {JSON.parse(localStorage.getItem('user')).email}
      </h2>

      <div className="button-content">

        <button
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          <img className="icons-profile" src={ check } alt="check" />
          Done Recipes

        </button>
        <button
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          <img className="icons-profile" src={ heart } alt="heart" />
          Favorite Recipes

        </button>
        <button
          data-testid="profile-logout-btn"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
        >
          <img className="icons-profile" src={ logout } alt="logout" />
          Logout

        </button>
      </div>
      <Footer />
    </div>
  );
}
