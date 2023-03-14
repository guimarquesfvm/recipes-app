import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RecipesProvider from '../context/RecipesProvider';
// import { categorysMeals } from './MockCategory';
import renderWithRouter from './renderWithRouter';
import fetch from './mocks/fetch';

afterEach(() => { jest.clearAllMocks(); });

describe('end to end do projeto', () => {
  const beefExpect = 'Beef-category-filter';
  it('Testando a aplicaçao', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    expect(await screen.findByText('Login')).toBeInTheDocument();

    const inputEmail = screen.getByRole('textbox', { name: /email/i });
    const inputSenha = screen.getByLabelText(/senha/i);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, 'teste@test.com');
    userEvent.type(inputSenha, 'testando');
    userEvent.click(btnEntrar);
    expect(await screen.findByText('Recipes App')).toBeInTheDocument();
    expect(screen.getByText('Meals')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByText('Loading'));

    // testa botao Beef
    const btnBeef = await screen.findByTestId(beefExpect);
    userEvent.click(btnBeef);
    await waitForElementToBeRemoved(() => screen.getByText('Loading'));
    expect(screen.getByRole('img', { name: /beef and mustard pie/i })).toBeInTheDocument();
    // remove Filtro
    const btnBeef2 = await screen.findByTestId(beefExpect);
    userEvent.click(btnBeef2);
    await waitForElementToBeRemoved(() => screen.getByText('Loading'));
    expect(await screen.findByRole('img', { name: /corba/i })).toBeInTheDocument();

    // testa Botao Brakfast
    const btnBreakfast = await screen.findByTestId('Breakfast-category-filter');
    userEvent.click(btnBreakfast);
    await waitForElementToBeRemoved(() => screen.getByText('Loading'));
    expect(await screen.findByRole('img', { name: /breakfast potatoes/i })).toBeInTheDocument();

    // testa botao Chicken
    const btnChicken = await screen.findByTestId('Chicken-category-filter');
    userEvent.click(btnChicken);
    await waitForElementToBeRemoved(() => screen.getByText('Loading'));
    expect(await screen.findByRole('img', { name: /Brown Stew Chicken/i })).toBeInTheDocument();

    // testa Botao Dessert
    const btnDessert = await screen.findByTestId('Dessert-category-filter');
    userEvent.click(btnDessert);
    await waitForElementToBeRemoved(() => screen.getByText('Loading'));
    expect(await screen.findByRole('img', { name: /Apple & Blackberry Crumble/i })).toBeInTheDocument();

    // testa botao Goat
    const btnGoat = await screen.findByTestId('Goat-category-filter');
    userEvent.click(btnGoat);
    await waitForElementToBeRemoved(() => screen.getByText('Loading'));
    expect(await screen.findByRole('img', { name: /mbuzi choma \(roasted goat\)/i })).toBeInTheDocument();

    // testa botao All
    const btnBeef3 = await screen.findByTestId(beefExpect);
    userEvent.click(btnBeef3);
    await waitForElementToBeRemoved(() => screen.getByText('Loading'));
    expect(await screen.findByRole('img', { name: /beef and mustard pie/i })).toBeInTheDocument();
    const btnAll = await screen.findByTestId('All-category-filter');
    userEvent.click(btnAll);
    await waitForElementToBeRemoved(() => screen.getByText('Loading'));
    expect(await screen.findByRole('img', { name: /corba/i })).toBeInTheDocument();

    const linkMeals = screen.getByText(/corba/i);
    userEvent.click(linkMeals);
    expect(await screen.findByText('Recipe Details')).toBeInTheDocument();
    expect(await screen.findByText('Spicy Arrabiata Penne')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId('video')).toBeInTheDocument();
    expect(screen.getAllByTestId(/ingredient-name-and-measure/i)).toHaveLength(8);
    expect(screen.getAllByTestId(/recommendation-title/i)).toHaveLength(6);

    const btnFavorite = screen.getByRole('button', { name: /favorite-heart/i });
    userEvent.click(btnFavorite);

    // const btnStartRecipe = screen.getByRole('button', { name: /start recipe/i });
    // userEvent.click(btnStartRecipe);

    // const btnShare = screen.getByRole('button', { name: /share button/i })
    // userEvent.click(btnShare);
  });

  it('testando caminho para profile', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    expect(await screen.findByText('Login')).toBeInTheDocument();

    const inputEmail = screen.getByRole('textbox', { name: /email/i });
    const inputSenha = screen.getByLabelText(/senha/i);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, 'teste@test.com');
    userEvent.type(inputSenha, 'testando');
    userEvent.click(btnEntrar);
    expect(await screen.findByText('Recipes App')).toBeInTheDocument();
    expect(screen.getByText('Meals')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByText('Loading'));
    expect(await screen.findByTestId(beefExpect)).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: /corba/i })).toBeInTheDocument();
    const btnProfile = screen.getByRole('button', { name: /profile icon/i });
    userEvent.click(btnProfile);
    expect(await screen.findByText('Profile'));
    expect(screen.getByTestId('profile-email'));

    const btnFavorites = screen.getByRole('button', { name: /favorite recipes/i });
    userEvent.click(btnFavorites);
    expect(screen.getByText('Favorite Recipes'));

    const btnMeals = screen.getByRole('button', { name: /meals/i });
    const btnDrinks = screen.getByRole('button', { name: /drinks/i });
    const btnAll = screen.getByRole('button', { name: /all/i });

    userEvent.click(btnMeals);
    userEvent.click(btnDrinks);
    userEvent.click(btnAll);

    const btnProfile2 = screen.getByRole('button', { name: /profile icon/i });
    userEvent.click(btnProfile2);
    expect(screen.getByTestId('profile-email'));

    const btnDone = screen.getByRole('button', { name: /done recipes/i });
    userEvent.click(btnDone);
    expect(await screen.findByText('Done Recipes'));

    const btnMealsDone = screen.getByRole('button', { name: /meals/i });
    const btnDrinksDone = screen.getByRole('button', { name: /drinks/i });
    const btnAllDone = screen.getByRole('button', { name: /all/i });

    userEvent.click(btnMealsDone);
    userEvent.click(btnDrinksDone);
    userEvent.click(btnAllDone);

    expect(screen.getByText(/You have no completed recipes./i));

    const btnProfile3 = screen.getByRole('button', { name: /profile icon/i });
    userEvent.click(btnProfile3);
    expect(screen.getByTestId('profile-email'));

    const btnLogout = screen.getByRole('button', { name: /logout/i });
    userEvent.click(btnLogout);
    expect(await screen.getByText('Login'));
    // const btnSearch = await screen.findByRole('button', { name: /search icon/i });
  });
});
