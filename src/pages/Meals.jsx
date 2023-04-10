import React from 'react';
import CardReceitas from '../components/CardReceitas';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../style/Drinks.css';

export default function Meals() {
  return (
    <>
      <Header title="Meals" />
      <CardReceitas />
      <Footer />
    </>
  );
}
