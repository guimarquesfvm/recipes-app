import { useState } from 'react';

function useHookRecipes() {
  // array com todas as receitas
  const [api, setApi] = useState();
  // array com todas as categorias
  const [categorysApi, setCategorysApi] = useState([]);
  // controla a categoria selecionada do botao
  const [category, setCategory] = useState('');
  // controla o loding
  const [loading, setLoading] = useState(true);
  // page serve para constrolar em qual pagina esta
  const [page, setPage] = useState('meals');

  // botao para selecionar a categoria
  const toggleButton = ({ target }) => {
    const { name } = target;
    setLoading(true);
    if (category === name) {
      setCategory('');
      return;
    }
    setCategory(name);
  };

  return {
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
  };
}

export default useHookRecipes;
