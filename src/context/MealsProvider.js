import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { filterApi, mealsAPI, categoryApi } from '../helpers/mealsAPI';
import MealsContext from './MealsContext';
import useHookMeals from './useHookMeals';

function MealsProvider({ children }) {
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
  } = useHookMeals();

  // funçao que controla a requisiçao da Api
  const requestApi = async () => {
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
  }, [category]);

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
    toggleButton,
  }
  ), [api, category, categorysApi, loading, page,
    setApi, setCategory, setCategorysApi, setLoading, setPage, toggleButton]);

  return (
    <MealsContext.Provider
      value={ hookMeals }
    >
      { children }
    </MealsContext.Provider>
  );
}

MealsProvider.propTypes = {
  children: PropTypes.element,
}.isRequired;

export default MealsProvider;
