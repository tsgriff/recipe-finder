import * as toprecipesimport from '../services/recipe-service';

const GET_DATA = 'GET_DATA';
const GET_DATA_PENDING = 'GET_DATA_PENDING';
const GET_DATA_FULFILLED = 'GET_DATA_FULFILLED';

const initialState = {
  topRecipes: [],
  loading: false
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_DATA_PENDING:
      return Object.assign({}, state, {loading: true})

    case GET_DATA_FULFILLED:
      return Object.assign({}, state, {loading: false, topRecipes: action.payload})

    default:
      return state
  }
}

export function getTopRecipes(pageNum) {
  return {
    type: GET_DATA,
    payload: toprecipesimport.getTopRecipes(pageNum)
  }
}
