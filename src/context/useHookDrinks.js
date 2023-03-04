import { useState } from 'react';

function useHookDrinks() {
  const [api, setApi] = useState([]);
  const [category, setCategory] = useState('');

  const toggleButton = ({ target }) => {
    const { name } = target;
    if (category === name) {
      setCategory('');
      return;
    }
    setCategory(name);
  };

  return {
    category,
    api,
    setApi,
    setCategory,
    toggleButton,
  };
}

export default useHookDrinks;
