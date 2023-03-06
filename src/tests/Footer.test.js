import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import App from '../App';
import renderWithRouter from './renderWithRouter';
import Footer from '../components/Footer';

describe('Testes do componente Footer.js', () => {
  it('Testa se existem dois botões, drink e meals.', () => {
    renderWithRouter(<Footer />);
    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    const mealsButton = screen.getByTestId('meals-bottom-btn');
    expect(drinksButton).toBeInTheDocument();
    expect(mealsButton).toBeInTheDocument();
  });
  it('Testa se ao cliclar no ícone de drink, é redirecionado a lista.', () => {
    const { history } = renderWithRouter(<Footer />);
    const drinksbutton = screen.getByTestId('drinks-bottom-btn', { name: /listdrinks/i });
    userEvent.click(drinksbutton);
    expect(drinksbutton).toBeInTheDocument();
    const { location: { pathname } } = history;
    expect(pathname).toBe('/listdrinks');
  });
  it('Testa se ao clicar no ícone de meals, é redirecionado a lista.', () => {
    const { history } = renderWithRouter(<Footer />);
    const mealsbutton = screen.getByTestId('meals-bottom-btn', { name: /listmeals/i });
    userEvent.click(mealsbutton);
    expect(mealsbutton).toBeInTheDocument();
    const { location: { pathname } } = history;
    expect(pathname).toBe('/listmeals');
  });
});
