import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <Switch>
      <Route path="/meals/:id" component={ RecipeDetails } />
      <Route path="/drinks/:id" component={ RecipeDetails } />
      <Route path="/drinks/:id/in-progress" />
      <Route path="/meals/:id/in-progress" />
      <Route exact path="/favorite-recipes" />
      <Route exact path="/done-recipes" />
      <Route exact path="/profile" />
      <Route exact path="/drinks" />
      <Route exact path="/meals" />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
