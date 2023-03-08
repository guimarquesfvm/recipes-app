import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';

const setLocalStorage = (key, data) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

describe('Testa as funcionalidadea da página Done Recipes', () => {
  const recipes = [
    {
      alcoholicOrNot: '',
      nationality: 'Turkish',
      category: 'Side',
      doneDate: '2023-03-07T18:38:29.862Z',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      name: 'Corba',
      tags: [
        'Soup',
      ],
      type: 'meal',
      id: '52977',
    },
    {
      alcoholicOrNot: '',
      nationality: 'Japanese',
      category: 'Seafood',
      doneDate: '2023-03-07T18:39:08.611Z',
      image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
      name: 'Sushi',
      tags: [],
      type: 'meal',
      id: '53065',

    },
    {
      alcoholicOrNot: 'Alcoholic',
      nationality: '',
      category: 'Cocktail',
      doneDate: '2023-03-07T18:39:42.057Z',
      image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
      name: 'A1',
      tags: [],
      type: 'drink',
      id: '17222',
    },
  ];

  const buttonAllId = 'filter-by-all-btn';
  const buttonMealsId = 'filter-by-meal-btn';
  const buttonDrinksId = 'filter-by-drink-btn';
  setLocalStorage('doneRecipes', recipes);

  it('Testa se há os botões de filtros em Tela', () => {
    renderWithRouter(<DoneRecipes />);
    const buttonAll = screen.getByTestId(buttonAllId);
    const buttonMeals = screen.getByTestId(buttonMealsId);
    const buttonDrinks = screen.getByTestId(buttonDrinksId);
    expect(buttonAll).toBeInTheDocument();
    expect(buttonMeals).toBeInTheDocument();
    expect(buttonDrinks).toBeInTheDocument();
  });

  it('Testa se as as receitas salvas no local storage são renderizadas corretamente.', () => {
    renderWithRouter(<DoneRecipes />);
    const recipe1 = screen.getByText('Corba');
    const recipe2 = screen.getByText('Sushi');
    const recipe3 = screen.getByText('A1');
    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
    expect(recipe3).toBeInTheDocument();
  });

  it('Testa o botão de filtro Meals.', () => {
    renderWithRouter(<DoneRecipes />);
    const recipe1 = screen.getByText('Corba');
    const recipe2 = screen.getByText('Sushi');
    const recipe3 = screen.getByText('A1');
    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
    expect(recipe3).toBeInTheDocument();
    const buttonMeals = screen.getByTestId(buttonMealsId);
    userEvent.click(buttonMeals);
    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
    expect(recipe3).not.toBeInTheDocument();
  });

  it('Testa o botão de filtro Drinks.', () => {
    renderWithRouter(<DoneRecipes />);
    const recipe1 = screen.getByText('Corba');
    const recipe2 = screen.getByText('Sushi');
    const recipe3 = screen.getByText('A1');
    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
    expect(recipe3).toBeInTheDocument();
    const buttonDrinks = screen.getByTestId(buttonDrinksId);
    userEvent.click(buttonDrinks);
    expect(recipe1).not.toBeInTheDocument();
    expect(recipe2).not.toBeInTheDocument();
    expect(recipe3).toBeInTheDocument();
  });

  it('Testa o botão de filtro All.', () => {
    renderWithRouter(<DoneRecipes />);
    const recipe1 = screen.getByText('Corba');
    const recipe2 = screen.getByText('Sushi');
    const recipe3 = screen.getByText('A1');
    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
    expect(recipe3).toBeInTheDocument();
    const buttonAll = screen.getByTestId(buttonAllId);
    userEvent.click(buttonAll);
    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
    expect(recipe3).toBeInTheDocument();
  });

  it('Testa botão de compartilhar.', async () => {
    renderWithRouter(<DoneRecipes />);
    const buttonShare = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(buttonShare);
    const recipe1 = await screen.findByText('Link copied!');
    expect(recipe1).toBeInTheDocument();
  });

  it('Testa se é possível acessar a página de detalhes de uma receita salva.', () => {
    renderWithRouter(<DoneRecipes />);
    const recipe1 = screen.getByText('Corba');
    expect(recipe1).toBeInTheDocument();
    const recipeLink = screen.getByTestId('0-horizontal-name');
    userEvent.click(recipeLink);
    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
    const recipeImage = screen.getByAltText('Corba');
    expect(recipeImage).toBeInTheDocument();
  });

  it('Testa se não tiver receitas concluidas aparece a mensagem: You have no completed recipes.', () => {
    setLocalStorage('doneRecipes', null);
    renderWithRouter(<DoneRecipes />);
    const recipe1 = screen.getByText('You have no completed recipes.');
    expect(recipe1).toBeInTheDocument();
  });
});
