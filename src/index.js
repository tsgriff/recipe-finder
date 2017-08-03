// DEPENDENCIES //

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './ducks/store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {unregister} from './registerServiceWorker';

// CSS //

import './index.css';

// COMPONENTS //

import Nav from './components/Nav/nav';
import Footer from './components/Footer/footer';
import About from './components/About/about';

// CONTAINERS //

import Home from './containers/Home/home';
import UserProfile from './containers/UserProfile/user-profile';
import SearchResults from './containers/SearchResults/search-results';
import RecipeDetails from './containers/RecipeDetails/recipe-details';


ReactDOM.render(
  	<Provider store={store}>
      <BrowserRouter>
        <div>
              <Route component={ Nav }/>
            <Switch>
              <Route path="/recipes/:term" component={ SearchResults } />
              <Route path="/recipe/:id" component={ RecipeDetails } />
              <Route path="/profile" component={ UserProfile } />
              <Route path="/about" component={ About } />
              <Route exact path="/" component={ Home }/>
            </Switch>
              <Route component={ Footer }/>
        </div>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
// registerServiceWorker();
// Unregister service worker in order for Auth0 to work //
  unregister()
