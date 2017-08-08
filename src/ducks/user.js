import * as userinfo from '../services/user-service';

const GET_USER = 'GET_USER';
const GET_USER_PENDING = 'GET_USER_PENDING';
const GET_USER_FULFILLED = 'GET_USER_FULFILLED';

const initialState = {
  userData: [],
  loading: false
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_USER_PENDING:
      return Object.assign({}, state, {loading: true})

    case GET_USER_FULFILLED:
      return Object.assign({}, state, {loading: false, userData: action.payload})

    default:
      return state
  }
}

export function getUserInfo() {
  return {
    type: GET_USER,
    payload: userinfo.getUserInfo()
  }
}
