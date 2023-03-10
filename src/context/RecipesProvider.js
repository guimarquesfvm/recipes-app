import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { filterApi, mealsAPI, categoryApi } from '../helpers/mealsAPI';
import useHookRecipes from './useHookRecipes';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const {
    category,
    setCategory,
    api,
    setApi,
    loading,
    setLoading,
    page,
    setPage,
    toggleButton,
    categorysApi,
    setCategorysApi,
    favoriteRecipes,
    setFavoriteRecipes,
    toggleButtonAll,
  } = useHookRecipes();

  const getStorage = JSON.parse(localStorage.getItem('user'));

  // funçao que controla a requisiçao da Api
  const requestApi = async () => {
    setLoading(true);
    if (category === '') {
      setApi(await mealsAPI(page));
    } else {
      setApi(await filterApi(category, page));
    }
    setCategorysApi(await categoryApi(page));
    setLoading(false);
  };

  useEffect(() => {
    requestApi();
    if (!getStorage) {
      localStorage.setItem('user', JSON.stringify({ email: '' }));
    }
  }, [category, page]);

  const hookMeals = useMemo(() => ({
    category,
    setCategory,
    api,
    setApi,
    loading,
    setLoading,
    page,
    setPage,
    categorysApi,
    setCategorysApi,
    favoriteRecipes,
    setFavoriteRecipes,
    toggleButton,
    toggleButtonAll,
  }
  ), [api, category, categorysApi, favoriteRecipes, loading, page,
    setApi, setCategory, setCategorysApi, setFavoriteRecipes,
    setLoading, setPage, toggleButton, toggleButtonAll]);

  return (
    <RecipesContext.Provider
      value={ hookMeals }
    >
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.element,
}.isRequired;

export default RecipesProvider;
