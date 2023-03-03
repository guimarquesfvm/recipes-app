import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('TESTES DA LOGIN.JS PAGE', () => {
  it('renderiza todos os elementos iniciais', () => {
    renderWithRouter(<App />);

    screen.getByText(/Login/i);
    screen.getByLabelText(/Email:/i);
    screen.getByLabelText(/Senha:/i);

    const button = screen.getByText(/Entrar/i);
    expect(button).toBeDisabled();
  });
  it('testa a validação dos campos ERRADO', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByLabelText(/Email:/i);
    const senhaInput = screen.getByLabelText(/Senha:/i);

    userEvent.type(emailInput, '123');
    userEvent.type(senhaInput, '123');

    const button = screen.getByText(/Entrar/i);
    expect(button).toBeDisabled();
  });
  it('testa a validação dos campos CERTO', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByLabelText(/Email:/i);
    const senhaInput = screen.getByLabelText(/Senha:/i);

    userEvent.type(emailInput, 'borboleta@123.com');
    userEvent.type(senhaInput, 'borboleta123');

    const button = screen.getByText(/Entrar/i);
    expect(button).not.toBeDisabled();
  });
  it('testa se o email é guardado no localStorage corretamente', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByLabelText(/Email:/i);
    const senhaInput = screen.getByLabelText(/Senha:/i);
    const button = screen.getByText(/Entrar/i);

    userEvent.type(emailInput, 'borboletinha@123.com');
    userEvent.type(senhaInput, 'borboletinha123');
    userEvent.click(button);

    const userLS = JSON.parse(localStorage.getItem('user'));
    expect(userLS).toMatchObject({ email: 'borboletinha@123.com' });
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');
  });
});
