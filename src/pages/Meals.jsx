import React from 'react';
import CardReceitas from '../components/CardReceitas';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Meals() {
  return (
    <>
      <Header title="Meals" />
      <CardReceitas />
      <Footer />
    </>
  );
}
