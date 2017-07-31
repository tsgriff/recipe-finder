import * as detailsimport from '../services/recipe-service';

const GET_DETAILS = 'GET_DETAILS';
const GET_DETAILS_PENDING = 'GET_DETAILS_PENDING';
const GET_DETAILS_FULFILLED = 'GET_DETAILS_FULFILLED';

const initialState = {
  recipeDetails: [],
  loading: false
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_DETAILS_PENDING:
      return Object.assign({}, state, {loading: true})

    case GET_DETAILS_FULFILLED:
      return Object.assign({}, state, {loading: false, recipeDetails: action.payload})

    default:
      return state
  }
}

export function getDetails(id) {
  return {
    type: GET_DETAILS,
    payload: detailsimport.getDetails(id)
  }
}
