import * as notesImport from '../services/notes-service';

const NOTES = 'NOTES';
const NOTES_PENDING = 'NOTES_PENDING';
const NOTES_FULFILLED = 'NOTES_FULFILLED';

const initialState = {
  notes: [],
  loading: false
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case NOTES_PENDING:
      return Object.assign({}, state, {loading: true})

    case NOTES_FULFILLED:
      return Object.assign({}, state, {loading: false, notes: action.payload})

    default:
      return state
  }
}

export function getNotes(user, recipe) {
  return {
    type: NOTES,
    payload: notesImport.getNotes(user, recipe)
  }
}
