import * as favoritevideos from '../services/favorite-video-service';

const GET_VIDEOS = 'GET_VIDEOS';
const GET_VIDEOS_PENDING = 'GET_VIDEOS_PENDING';
const GET_VIDEOS_FULFILLED = 'GET_VIDEOS_FULFILLED';


const initialState = {
  favoriteVideos: [],
  loading: false
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_VIDEOS_PENDING:
      return Object.assign({}, state, {loading: true})

    case GET_VIDEOS_FULFILLED:
      return Object.assign({}, state, {loading: false, favoriteVideos: action.payload})


    default:
      return state
  }
}

export function getFavoriteVideos(user_id) {
  return {
    type: GET_VIDEOS,
    payload: favoritevideos.getFavoriteVideos(user_id)
  }
}
