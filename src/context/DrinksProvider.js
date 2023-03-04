// import PropTypes from 'prop-types';
// import DrinksContext from './DrinksContext';
// import useHookDrinks from './useHookDrinks';

// function DrinksProvider({ children }) {
//   const {
//     category,
//     api,
//     setApi,
//     setCategory,
//     toggleButton,
//   } = useHookDrinks();

//   const requestApi = async () => {
//     if (category === '') {
//       setApi(await mealsAPI());
//       return;
//     }
//     setApi(await filterApi(category));
//   };

//   useEffect(() => {
//     requestApi();
//   }, [category]);

//   const hookMeals = useMemo(() => ({
//     category,
//     api,
//     setApi,
//     setCategory,
//     toggleButton,
//   }
//   ), [api, category, setApi, setCategory, toggleButton]);
//   return (
//     <DrinksContext.Provider value={ prop }>
//       { children }
//     </DrinksContext.Provider>
//   );
// }

// DrinksProvider.propTypes = {
//   children: PropTypes.element,
// }.isRequired;

// export default DrinksProvider;
