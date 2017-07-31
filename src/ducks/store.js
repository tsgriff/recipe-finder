import {createStore, applyMiddleware, combineReducers} from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import topRecipesReducer from './top-recipes';

const reducer = combineReducers({
  topRecipesReducer: topRecipesReducer
})

export default createStore(
  reducer,
  applyMiddleware(reduxPromiseMiddleware())
);
