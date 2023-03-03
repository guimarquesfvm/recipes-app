import PropTypes from 'prop-types';
import MealsContext from './MealsContext';

function MealsProvider({ children }) {
  const prop = ''; // fiz isso apenas pra parar de dar erro nos testes, pode excluir ele e o value passado no provider!
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
