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
  const email = 'profile-email';
  const login = 'teste@test.com';

  it('Testando a aplicaçao', async () => {
    const json = {
      13501: [],
      14598: [
        true,
        true,
        true,
      ],
      15300: [],
      15997: [],
      17222: [],
      undefined: [],
    };
    window.localStorage.setItem('inProgressRecipes', JSON.stringify(json));
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    expect(await screen.findByText('Login')).toBeInTheDocument();

    const inputEmail = screen.getByRole('textbox', { name: /email/i });
    const inputSenha = screen.getByLabelText(/senha/i);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, login);
    userEvent.type(inputSenha, 'testando');
    userEvent.click(btnEntrar);
    expect(await screen.findByText(/Recipes/i)).toBeInTheDocument();
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

    const startRecipe = screen.getByRole('button', { name: /start recipe/i });
    userEvent.click(startRecipe);
    expect(await screen.findByText(/Spicy Arrabiata Penne/i)).toBeInTheDocument();

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(8);

    checkboxes.forEach((box) => {
      userEvent.click(box);
      expect(box).toBeChecked();
    });

    const checkboxes2 = screen.getAllByRole('checkbox');

    checkboxes2.forEach((box) => {
      userEvent.click(box);
      expect(box).not.toBeChecked();
    });

    expect(screen.getByRole('button', { name: /finish recipe/i })).toBeInTheDocument();
    expect(screen.getByTestId('video')).toBeInTheDocument();

    const btnFavoriteInProgress = screen.getByRole('button', { name: /favorite-heart/i });
    userEvent.click(btnFavoriteInProgress);
    const storage = window.localStorage.getItem('favoriteRecipes');
    expect(storage).toBe('[]');

    const btnFavoriteInProgress2 = screen.getByRole('button', { name: /favorite-heart/i });
    userEvent.click(btnFavoriteInProgress2);
    const storage2 = window.localStorage.getItem('favoriteRecipes');
    expect(storage2).toBe('[{"id":"52771","type":"meal","nationality":"Italian","category":"Vegetarian","alcoholicOrNot":"","name":"Spicy Arrabiata Penne","image":"https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"}]');
    // const btnStartRecipe = screen.getByRole('button', { name: /start recipe/i });
    // userEvent.click(btnStartRecipe);

    // const btnShare = screen.getByRole('button', { name: /share button/i })
    // userEvent.click(btnShare);
  });

  it('testando caminho para profile', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    const { history } = renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    expect(await screen.findByText('Login')).toBeInTheDocument();

    const inputEmail = screen.getByRole('textbox', { name: /email/i });
    const inputSenha = screen.getByLabelText(/senha/i);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, login);
    userEvent.type(inputSenha, 'testando');
    userEvent.click(btnEntrar);
    expect(await screen.findByText(/Recipes/i)).toBeInTheDocument();
    expect(screen.getByText('Meals')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByText('Loading'));
    const btnSearch = await screen.findByRole('button', { name: /search icon/i });
    userEvent.click(btnSearch);
    expect(await screen.findByText(/search/i)).toBeInTheDocument();
    const btnSearch2 = await screen.findByRole('button', { name: /search icon/i });
    userEvent.click(btnSearch2);

    expect(await screen.findByTestId(beefExpect)).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: /corba/i })).toBeInTheDocument();
    const btnProfile = screen.getByRole('button', { name: /profile icon/i });
    userEvent.click(btnProfile);
    expect(history.location.pathname).toBe('/profile');
    expect(await screen.findByText('Profile'));
    expect(screen.getByTestId(email));

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
    expect(screen.getByTestId(email));

    const btnDone = screen.getByRole('button', { name: /done recipes/i });
    userEvent.click(btnDone);
    expect(await screen.findByText('Done Recipes'));

    const btnMealsDone = screen.getByRole('img', { name: /meals button/i });
    const btnDrinksDone = screen.getByRole('img', { name: /drinks button/i });
    const btnAllDone = screen.getByRole('img', { name: /all button/i });

    userEvent.click(btnMealsDone);
    userEvent.click(btnDrinksDone);
    userEvent.click(btnAllDone);

    expect(screen.getByText(/You have no completed recipes./i));

    const btnProfile3 = screen.getByRole('button', { name: /profile icon/i });
    userEvent.click(btnProfile3);
    expect(screen.getByTestId(email));

    const btnLogout = screen.getByRole('button', { name: /logout/i });
    userEvent.click(btnLogout);
    expect(await screen.findByText('Login'));
    // const btnSearch = await screen.findByRole('button', { name: /search icon/i });
  });

  it('Testando a aplicaçao caminho drinks', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    expect(await screen.findByText('Login')).toBeInTheDocument();

    const inputEmail = screen.getByRole('textbox', { name: /email/i });
    const inputSenha = screen.getByLabelText(/senha/i);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, login);
    userEvent.type(inputSenha, 'testando');
    userEvent.click(btnEntrar);
    await waitForElementToBeRemoved(() => screen.getByText('Loading'));
    const drinkBtn = screen.getByRole('img', { name: /juice/i });
    userEvent.click(drinkBtn);

    expect(await screen.findByText(/recipes/i)).toBeInTheDocument();
    expect(await screen.findByText('Drinks')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByText('Loading'));

    // testa botao Beef
    const btnOrdinaryDrink = await screen.findByTestId('Ordinary Drink-category-filter');
    userEvent.click(btnOrdinaryDrink);
    await waitForElementToBeRemoved(() => screen.getByText('Loading'));
    expect(screen.getByRole('img', { name: /3-mile long island iced tea/i })).toBeInTheDocument();
    // remove Filtro
    const btnOrdinaryDrink2 = await screen.findByTestId('Ordinary Drink-category-filter');
    userEvent.click(btnOrdinaryDrink2);
    await waitForElementToBeRemoved(() => screen.getByText('Loading'));
    expect(await screen.findByRole('img', { name: /gg/i })).toBeInTheDocument();

    // testa Botao Brakfast
    const btnCocktail = await screen.findByTestId('Cocktail-category-filter');
    userEvent.click(btnCocktail);
    await waitForElementToBeRemoved(() => screen.getByText('Loading'));
    expect(await screen.findByRole('img', { name: /155 belmont/i })).toBeInTheDocument();

    // testa botao Chicken
    const btnShake = await screen.findByTestId('Shake-category-filter');
    userEvent.click(btnShake);
    await waitForElementToBeRemoved(() => screen.getByText('Loading'));
    expect(await screen.findByRole('img', { name: /151 florida bushwacker/i })).toBeInTheDocument();

    // testa Botao Dessert
    const btnOther = await screen.findByTestId(/Other/i);
    userEvent.click(btnOther);
    await waitForElementToBeRemoved(() => screen.getByText('Loading'));
    expect(await screen.findByRole('img', { name: /a piece of ass/i })).toBeInTheDocument();

    // testa botao Goat
    const btnCocoa = await screen.findByTestId('Cocoa-category-filter');
    userEvent.click(btnCocoa);
    await waitForElementToBeRemoved(() => screen.getByText('Loading'));
    expect(await screen.findByRole('img', { name: /castillian hot chocolate/i })).toBeInTheDocument();

    const btnAll = await screen.findByTestId('All-category-filter');
    userEvent.click(btnAll);
    await waitForElementToBeRemoved(() => screen.getByText('Loading'));
    expect(await screen.findByRole('img', { name: /gg/i })).toBeInTheDocument();

    const linkDrink = screen.getByText(/gg/i);
    userEvent.click(linkDrink);
    expect(await screen.findByText('Recipe Details')).toBeInTheDocument();
    expect(await screen.findByText('GG')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getAllByTestId(/ingredient-name-and-measure/i)).toHaveLength(3);
    expect(screen.getAllByTestId(/recommendation-title/i)).toHaveLength(6);

    const btnFavorite = screen.getByRole('button', { name: /favorite-heart/i });
    userEvent.click(btnFavorite);

    // in-Progress
    const startRecipe = screen.getByRole('button', { name: /start recipe/i });
    userEvent.click(startRecipe);
    expect(await screen.findByText('GG')).toBeInTheDocument();

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3);

    checkboxes.forEach((box) => {
      userEvent.click(box);
      expect(box).toBeChecked();
    });

    const checkboxes2 = screen.getAllByRole('checkbox');

    checkboxes2.forEach((box) => {
      userEvent.click(box);
      expect(box).not.toBeChecked();
    });

    expect(screen.getByRole('button', { name: /finish recipe/i })).toBeInTheDocument();

    const btnFavoriteInProgress = screen.getByRole('button', { name: /favorite-heart/i });
    userEvent.click(btnFavoriteInProgress);
    const storage = window.localStorage.getItem('favoriteRecipes');
    expect(storage).toBe('[]');

    const btnFavoriteInProgress2 = screen.getByRole('button', { name: /favorite-heart/i });
    userEvent.click(btnFavoriteInProgress2);
    const storage2 = window.localStorage.getItem('favoriteRecipes');
    expect(storage2).toBe('[{"id":"15997","type":"drink","nationality":"","category":"Ordinary Drink","alcoholicOrNot":"Optional alcohol","name":"GG","image":"https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg"}]');

    // const btnStartRecipe = screen.getByRole('button', { name: /start recipe/i });
    // userEvent.click(btnStartRecipe);

    // const btnShare = screen.getByRole('button', { name: /share button/i })
    // userEvent.click(btnShare);
  });

  it('teste funcionalidade Search bar', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    expect(await screen.findByText('Login')).toBeInTheDocument();

    const inputEmail = screen.getByRole('textbox', { name: /email/i });
    const inputSenha = screen.getByLabelText(/senha/i);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, login);
    userEvent.type(inputSenha, 'testando');
    userEvent.click(btnEntrar);
    await waitForElementToBeRemoved(() => screen.getByText('Loading'));
    expect(await screen.findByText(/Recipes/i)).toBeInTheDocument();
    expect(screen.getByText('Meals')).toBeInTheDocument();

    const btnSearch = screen.getByRole('button', { name: /search icon/i });
    userEvent.click(btnSearch);
    const searchBar = screen.getByTestId('search-input');
    userEvent.type(searchBar, 'Beef');

    const nameOption = screen.getByRole('radio', { name: /name/i });
    userEvent.click(nameOption);

    // const searchBtn = screen.getByTestId('exec-search-btn');
    // userEvent.click(searchBtn);
  });

  it('teste botao de conti recipe', async () => {
    // const json = {
    //   meals: {
    //     52977: [],
    //     undefined: [],
    //   },
    // };
    // window.localStorage.setItem('inProgressRecipes', JSON.stringify(json));
    window.localStorage.removeItem('doneRecipes');
    jest.spyOn(global, 'fetch').mockImplementation(fetch);

    renderWithRouter(<RecipesProvider><App /></RecipesProvider>);
    expect(await screen.findByText('Login')).toBeInTheDocument();

    const inputEmail = screen.getByRole('textbox', { name: /email/i });
    const inputSenha = screen.getByLabelText(/senha/i);
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, login);
    userEvent.type(inputSenha, 'testando');
    userEvent.click(btnEntrar);
    await waitForElementToBeRemoved(() => screen.getByText('Loading'));
    expect(await screen.findByText(/Recipes/i)).toBeInTheDocument();
    expect(screen.getByText('Meals')).toBeInTheDocument();
    const corba = await screen.findByRole('img', { name: /corba/i });
    userEvent.click(corba);
    expect(await screen.findByTestId('recipe-title')).toBeInTheDocument();

    // const start = await screen.findByRole('button', { name: /start recipe/i });
    // userEvent.click(start);
    // history.push('/');
  });
});
