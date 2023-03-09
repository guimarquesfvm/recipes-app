import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('TESTES RECIPEDETAILS PAGE', () => {
  it('renderiza /MEALS corretamente', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/meals/52771'));

    screen.getByRole('heading', { level: 1 });
  });
});
