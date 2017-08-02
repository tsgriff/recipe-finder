import {createStore, applyMiddleware, combineReducers} from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import topRecipesReducer from './top-recipes';
import recipesReducer from './search-recipes';
import detailsReducer from './get-details';
import youtubeReducer from './youtube';


const reducer = combineReducers({
  topRecipesReducer: topRecipesReducer,
  recipesReducer: recipesReducer,
  detailsReducer: detailsReducer,
  youtubeReducer: youtubeReducer
})

export default createStore(
  reducer,
  applyMiddleware(reduxPromiseMiddleware())
);
