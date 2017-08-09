import * as favoriterecipes from '../services/favorite-recipe-service';

const GET_FAVORITES = 'GET_FAVORITES';
const GET_FAVORITES_PENDING = 'GET_FAVORITES_PENDING';
const GET_FAVORITES_FULFILLED = 'GET_FAVORITES_FULFILLED';


const initialState = {
  favoriteRecipes: [],
  loading: false
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_FAVORITES_PENDING:
      return Object.assign({}, state, {loading: true})

    case GET_FAVORITES_FULFILLED:
      return Object.assign({}, state, {loading: false, favoriteRecipes: action.payload})


    default:
      return state
  }
}

export function getFavoriteRecipes(user_id) {
  return {
    type: GET_FAVORITES,
    payload: favoriterecipes.getFavoriteRecipes(user_id)
  }
}
