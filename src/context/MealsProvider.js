import PropTypes from 'prop-types';
import MealsContext from './MealsContext';

function MealsProvider({ children }) {
  const prop = '';
  return (
    <MealsContext.Provider value={ prop }>
      { children }
    </MealsContext.Provider>
  );
}

MealsProvider.propTypes = {
  children: PropTypes.element,
}.isRequired;

export default MealsProvider;
