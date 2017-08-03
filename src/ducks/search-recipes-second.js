import * as secondimport from '../services/recipe-service';

const GET_SECOND = 'GET_SECOND';
const GET_SECOND_PENDING = 'GET_SECOND_PENDING';
const GET_SECOND_FULFILLED = 'GET_SECOND_FULFILLED';

const initialState = {
  searchResultsSecond: [],
  loading: false
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_SECOND_PENDING:
      return Object.assign({}, state, {loading: true})

    case GET_SECOND_FULFILLED:
      return Object.assign({}, state, {loading: false, searchResultsSecond: action.payload})

    default:
      return state
  }
}

export function getRecipesPageTwo(term) {
  return {
    type: GET_SECOND,
    payload: secondimport.getRecipesPageTwo(term)
  }
}
