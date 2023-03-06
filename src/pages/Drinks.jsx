import React, { useContext, useEffect } from 'react';
import CardReceitas from '../components/CardReceitas';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';

export default function Drinks() {
  const { page, setPage } = useContext(RecipesContext);
  useEffect(() => {
    setPage('drinks');
  }, [page, setPage]);

  return (
    <div>
      <CardReceitas />
      <Footer />
    </div>
  );
}
