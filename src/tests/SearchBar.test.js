import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import meals from '../../cypress/mocks/meals';

const EMAIL_INPUT_TESTID = 'email-input';
const PASSWORD_INPUT_TESTID = 'password-input';
const USER_EMAIL = 'alguem@alguem.com';
const USER_PASSWORD = '1234567';
const BUTTON_TEST_ID = 'login-submit-btn';
const ONE_CHARACTER = 'Your search must have only 1 (one) character';
const SEARCH_TOP_BTN = 'search-top-btn';
const FIRST_LETTER_SEARCH_RADIO = 'first-letter-search-radio';
const SEARCH_INPUT = 'search-input';
const SEARCH_BTN = '[data-testid="exec-search-btn"]';

describe('o componente SearchBar', () => {
  test('se o usuário consegue pesquisar por alguma receita de meal', async () => {
    renderWithRouter(<App />);
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(meals),
    });

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
    const loginButton = screen.getByTestId(BUTTON_TEST_ID);

    userEvent.type(emailInput, USER_EMAIL);
    userEvent.type(passwordInput, USER_PASSWORD);
    userEvent.click(loginButton);

    const searchButton = await screen.findByTestId(SEARCH_TOP_BTN);

    await act(async () => {
      userEvent.click(searchButton);
    });

    const nameRadio = screen.getByTestId('name-search-radio');
    const firstNameRadio = screen.getByTestId(FIRST_LETTER_SEARCH_RADIO);
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const filterButton = document.querySelector(SEARCH_BTN);

    waitFor(() => {
      expect(nameRadio).toBeInTheDocument();
      expect(ingredientRadio).toBeInTheDocument();
      expect(firstNameRadio).toBeInTheDocument();
    });

    await act(async () => {
      userEvent.click(nameRadio);
      userEvent.type(searchInput, 'pizza');
      userEvent.click(filterButton);
    });

    waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=pizza'));
  });

  test('se o usuário consegue pesquisar por alguma receita de drink', async () => {
    const { history } = renderWithRouter(<App />);
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockImplementationOnce(drinks),
    });

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
    const loginButton = screen.getByTestId(BUTTON_TEST_ID);

    userEvent.type(emailInput, USER_EMAIL);
    userEvent.type(passwordInput, USER_PASSWORD);
    userEvent.click(loginButton);

    await act(async () => {
      history.push('/drinks');
    });

    const title = await screen.findByTestId('page-title');
    const searchButton = await screen.findByTestId(SEARCH_TOP_BTN);

    console.log(title);

    await act(async () => {
      userEvent.click(searchButton);
    });

    const nameRadio = screen.getByTestId('name-search-radio');
    const firstNameRadio = screen.getByTestId(FIRST_LETTER_SEARCH_RADIO);
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const filterButton = document.querySelector(SEARCH_BTN);

    waitFor(() => {
      expect(nameRadio).toBeInTheDocument();
      expect(ingredientRadio).toBeInTheDocument();
      expect(firstNameRadio).toBeInTheDocument();
    });

    await act(async () => {
      userEvent.click(ingredientRadio);
      userEvent.type(searchInput, 'sugar');
      userEvent.click(filterButton);
    });

    waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=sugar'));
  });
  test('se o usuário recebe um alerta se digita mais de uma letra', async () => {
    renderWithRouter(<App />);
    jest.spyOn(global, 'alert').mockResolvedValue(
      { ONE_CHARACTER },
    );

    const emailInput = screen.getByTestId(EMAIL_INPUT_TESTID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TESTID);
    const loginButton = screen.getByTestId(BUTTON_TEST_ID);

    const userEmail = 'alguem@alguem.com';
    const userPassword = '1234567';

    userEvent.type(emailInput, userEmail);
    userEvent.type(passwordInput, userPassword);
    userEvent.click(loginButton);

    const searchButton = await screen.findByTestId(SEARCH_TOP_BTN);

    await act(async () => {
      userEvent.click(searchButton);
    });

    const firstLetter = screen.getByTestId(FIRST_LETTER_SEARCH_RADIO);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const filterButton = document.querySelector(SEARCH_BTN);

    await act(async () => {
      userEvent.click(firstLetter);
      userEvent.type(searchInput, 'po');
      userEvent.click(filterButton);
    });

    expect(global.alert).toHaveBeenCalledWith(ONE_CHARACTER);
  });
});
