import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';

const searchTopBtnTestId = 'search-top-btn';
describe.skip('Será validado o component Header', () => {
  test('Será validado se o título será renderizado', () => {
    render(<Header title="Título Teste" />);
    const title = screen.getByTestId('page-title');
    expect(title.textContent).toBe('Título Teste');
  });

  test('Será validado se o SearchIcon será renderizado quando o título não for "Profile", "Done Recipes", "Favorite Recipes"', () => {
    render(<Header title="Teste" />);
    const searchIcon = screen.getByTestId(searchTopBtnTestId);
    expect(searchIcon).toBeInTheDocument();
  });

  test('Será validado se o SearchIcon será renderizado quando o título não for "Profile"', () => {
    render(<Header title="Profile" />);
    const searchIcon = screen.queryByTestId(searchTopBtnTestId);
    expect(searchIcon).not.toBeInTheDocument();
  });

  test('Será validado se o "SearchIcon" será renderizado quando o título não for "Done Recipes"', () => {
    render(<Header title="Done Recipes" />);
    const searchIcon = screen.queryByTestId(searchTopBtnTestId);
    expect(searchIcon).not.toBeInTheDocument();
  });

  test('Será validado se o "SearchIcon" será renderizado quando o título não for "Favorite Recipes"', () => {
    render(<Header title="Favorite Recipes" />);
    const searchIcon = screen.queryByTestId(searchTopBtnTestId);
    expect(searchIcon).not.toBeInTheDocument();
  });

  test('Será validado se a "SearchBar" é exibida quando clicar no "SearchIcon" pela primeira vez', () => {
    render(<Header title="Teste" />);
    const searchIcon = screen.getByTestId(searchTopBtnTestId);
    fireEvent.click(searchIcon);
    const searchBar = screen.getByTestId('search-bar');
    expect(searchBar).toBeInTheDocument();
  });

  test('Será validado se a "SearchBar" é ocultada quando clicar no "SearchIcon" pela segunda vez', () => {
    render(<Header title="Título Qualquer" />);
    const searchIcon = screen.getByTestId(searchTopBtnTestId);
    fireEvent.click(searchIcon);
    fireEvent.click(searchIcon);
    const searchBar = screen.queryByTestId('search-bar');
    expect(searchBar).not.toBeInTheDocument();
  });

  test('Será validado se a página será redirecionada para "Profile" ao clicar no "ProfileIcon"', () => {
    const historyMock = { push: jest.fn() };
    render(
      <BrowserRouter>
        <Header title="Teste seu Título Aqui" />
      </BrowserRouter>,
      { history: historyMock },
    );
    const profileIcon = screen.getByTestId('profile-top-btn');
    fireEvent.click(profileIcon);
    expect(historyMock.push).toHaveBeenCalledWith('/profile');
  });
});
