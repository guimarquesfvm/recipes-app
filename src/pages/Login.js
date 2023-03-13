import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import '../style/login.css';
import logo from '../images/logo Recipes App.png';

function Login(props) {
  const { history } = props;
  const { setPage } = useContext(RecipesContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState(true);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const SIX = 6;
    setValidation(emailRegex.test(email) && password.length > SIX);
  }, [email, password]);

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
    setPage(window.location.pathname.slice(1));
  };

  return (
    <form className="login-container">
      <img src={ logo } alt="logo" />
      <h1 className="login-title">Login</h1>
      <label htmlFor="email">
        Email:
        <br />
        <input
          id="email"
          type="email"
          data-testid="email-input"
          onChange={ (e) => setEmail(e.target.value) }
          className="login-input"
        />
      </label>

      <label htmlFor="password">
        Senha:
        <br />
        <input
          id="password"
          type="password"
          data-testid="password-input"
          onChange={ (e) => setPassword(e.target.value) }
          className="login-input"
        />
      </label>

      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ !validation }
        onClick={ handleSubmit }
        className="login-button"
      >
        Entrar
      </button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;

// requisitos 2, 3 done
