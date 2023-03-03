import PropTypes from 'prop-types';
import DrinksContext from './DrinksContext';

function DrinksProvider({ children }) {
  const prop = '';
  return (
    <DrinksContext.Provider value={ prop }>
      { children }
    </DrinksContext.Provider>
  );
}

DrinksProvider.propTypes = {
  children: PropTypes.element,
}.isRequired;

export default DrinksProvider;
