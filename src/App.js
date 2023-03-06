import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import MealsProvider from './context/MealsProvider';
import DrinksProvider from './context/DrinksProvider';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <MealsProvider>
      <DrinksProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/meals" />
          <Route path="/drinks" />
          <Route path="/meals/:id-da-receita" />
          <Route path="/drinks/:id-da-receita" />
          <Route path="/drinks/:id-da-receita/in-progress" />
          <Route path="/meals/:id-da-receita/in-progress" />
          <Route path="/profile" />
          <Route path="/done-recipes" />
          <Route path="/favorite-recipes" />
        </Switch>
        <SearchBar />
      </DrinksProvider>
    </MealsProvider>
  );
}

export default App;
