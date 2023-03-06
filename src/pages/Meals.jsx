import React from 'react';
import CardReceitas from '../components/CardReceitas';
import SearchBar from '../components/SearchBar';

export default function Meals() {
  return (
    <>
      <SearchBar />
      <CardReceitas />
    </>
  );
}
