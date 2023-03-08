import React from 'react';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import RecipesProvider from './context/RecipesProvider';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/meals" component={ Meals } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/meals/:id-da-receita" />
        <Route path="/drinks/:id-da-receita" />
        <Route path="/drinks/:id-da-receita/in-progress" />
        <Route path="/meals/:id-da-receita/in-progress" />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" />
        <Route path="/favorite-recipes" />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
