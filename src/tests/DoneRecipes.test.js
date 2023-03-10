import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';

describe('Testa as funcionalidadea da página Done Recipes', () => {
  const SpicyArrabiataPenne = 'Spicy Arrabiata Penne';

  const recipes = [
    {
      alcoholicOrNot: '',
      category: 'Vegetarian',
      doneDate: '23/06/2020',
      id: '52771',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      name: SpicyArrabiataPenne,
      nationality: 'Italian',
      tags: ['Pasta', 'Curry'],
      type: 'meal',
    },
    {
      alcoholicOrNot: 'Alcoholic',
      category: 'Cocktail',
      doneDate: '23/06/2020',
      id: '178319',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      name: 'Aquamarine',
      nationality: '',
      tags: [],
      type: 'drink',
    },
  ];

  const json = JSON.stringify(recipes);

  window.localStorage.setItem('doneRecipes', json);

  it('Testa se os botões de filtros são renderizados', () => {
    renderWithRouter(<DoneRecipes />);
    const buttonMeals = screen.getByTestId('filter-by-meal-btn');
    const buttonDrinks = screen.getByTestId('filter-by-drink-btn');
    const buttonAll = screen.getByTestId('filter-by-all-btn');
    expect(buttonMeals).toBeInTheDocument();
    expect(buttonDrinks).toBeInTheDocument();
    expect(buttonAll).toBeInTheDocument();
  });

  it('Testa se o botão de filtro Meals filtra só as comidas', () => {
    renderWithRouter(<DoneRecipes />);
    const buttonMeals = screen.getByTestId('filter-by-meal-btn');
    const recipe1 = screen.getByText(SpicyArrabiataPenne);
    const recipe2 = screen.getByText('Aquamarine');
    userEvent.click(buttonMeals);
    expect(recipe1).toBeInTheDocument();
    expect(recipe2).not.toBeInTheDocument();
  });

  it('Testa se o botão de filtro Drinks filtra só as bebidas', () => {
    renderWithRouter(<DoneRecipes />);
    const buttonDrinks = screen.getByTestId('filter-by-drink-btn');
    const recipe1 = screen.getByText(SpicyArrabiataPenne);
    const recipe2 = screen.getByText('Aquamarine');
    userEvent.click(buttonDrinks);
    expect(recipe1).toBeInTheDocument();
    expect(recipe2).not.toBeInTheDocument();
  });

  it('Testa se o botão de filtro All aparece todas as bebidas', () => {
    renderWithRouter(<DoneRecipes />);
    const buttonAll = screen.getByTestId('filter-by-all-btn');
    const recipe1 = screen.getByText(SpicyArrabiataPenne);
    const recipe2 = screen.getByText('Aquamarine');
    userEvent.click(buttonAll);
    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
  });

  it('Testa botão compartilhar', async () => {
    renderWithRouter(<DoneRecipes />);
    const buttonShare = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(buttonShare);
    const menssage = await screen.findByText('Link copied!');
    expect(menssage).toBeInTheDocument();
  });

  it('Testa se não tiver receitas concluidas aparece a mensagem: You have no completed recipes.', () => {
    window.localStorage.removeItem('doneRecipes');
    renderWithRouter(<DoneRecipes />);
    const recipe1 = screen.getByText('You have no completed recipes.');
    expect(recipe1).toBeInTheDocument();
  });
});
