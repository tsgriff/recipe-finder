import {createStore, applyMiddleware, combineReducers} from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import topRecipesReducer from './top-recipes';
import recipesReducer from './search-recipes';
import detailsReducer from './get-details';
import youtubeReducer from './youtube';
import userReducer from './user';
import favoriteRecipesReducer from './favorite-recipes';
import favoriteVideosReducer from './favorite-videos';
import notesReducer from './notes';


const reducer = combineReducers({
  topRecipesReducer: topRecipesReducer,
  recipesReducer: recipesReducer,
  detailsReducer: detailsReducer,
  youtubeReducer: youtubeReducer,
  userReducer: userReducer,
  favoriteRecipesReducer: favoriteRecipesReducer,
  favoriteVideosReducer: favoriteVideosReducer,
  notesReducer: notesReducer
})

export default createStore(
  reducer,
  applyMiddleware(reduxPromiseMiddleware())
);
