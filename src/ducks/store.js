import {createStore, applyMiddleware, combineReducers} from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import topRecipesReducer from './top-recipes';
import recipesReducer from './search-recipes';
import detailsReducer from './get-details';



const reducer = combineReducers({
  topRecipesReducer: topRecipesReducer,
  recipesReducer: recipesReducer,
  detailsReducer: detailsReducer
})

export default createStore(
  reducer,
  applyMiddleware(reduxPromiseMiddleware())
);
