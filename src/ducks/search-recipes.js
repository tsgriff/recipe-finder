import * as recipesimport from '../services/recipe-service';

const GET_RECIPES = 'GET_RECIPES';
const GET_RECIPES_PENDING = 'GET_RECIPES_PENDING';
const GET_RECIPES_FULFILLED = 'GET_RECIPES_FULFILLED';

const initialState = {
  searchResults: [],
  loading: false
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_RECIPES_PENDING:
      return Object.assign({}, state, {loading: true})

    case GET_RECIPES_FULFILLED:
      return Object.assign({}, state, {loading: false, searchResults: action.payload})

    default:
      return state
  }
}

export function getRecipes(term, pageNum) {
  return {
    type: GET_RECIPES,
    payload: recipesimport.getRecipes(term, pageNum)
  }
}
