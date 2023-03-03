import PropTypes from 'prop-types';
import DrinksContext from './DrinksContext';

function DrinksProvider({ children }) {
  const prop = ''; // fiz isso apenas pra parar de dar erro nos testes, pode excluir ele e o value passado no provider!
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
