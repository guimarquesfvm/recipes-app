import React, { useContext, useEffect } from 'react';
import CardReceitas from '../components/CardReceitas';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

export default function Drinks() {
  const { setPage } = useContext(RecipesContext);
  useEffect(() => {
    setPage('drinks');
  }, [setPage]);

  return (
    <>
      <Header title="teste" />
      <CardReceitas />
    </>
  );
}
