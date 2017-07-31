import {createStore, applyMiddleware, combineReducers} from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import topRecipesReducer from './top-recipes';
import recipesReducer from './search-recipes';


const reducer = combineReducers({
  topRecipesReducer: topRecipesReducer,
  recipesReducer: recipesReducer
})

export default createStore(
  reducer,
  applyMiddleware(reduxPromiseMiddleware())
);
