import * as videoimport from '../services/youtube-service';

const GET_VIDEOS = 'GET_VIDEOS';
const GET_VIDEOS_PENDING = 'GET_VIDEOS_PENDING';
const GET_VIDEOS_FULFILLED = 'GET_VIDEOS_FULFILLED';

const initialState = {
  videos: [],
  loading: false
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_VIDEOS_PENDING:
      return Object.assign({}, state, {loading: true})

    case GET_VIDEOS_FULFILLED:
      return Object.assign({}, state, {loading: false, videos: action.payload})

    default:
      return state
  }
}

export function videoSearch(term, page) {
  return {
    type: GET_VIDEOS,
    payload: videoimport.videoSearch(term, page)
  }
}
