import axios from 'axios';

export const addNote = function(user_id, recipe_id, notes) {
  return axios.post('/api/notes', {
    user_id, recipe_id, notes
  })
  .then(res => {return res.data})
}

export const getNotes = function(user_id, recipe_id) {
  return axios.get(`/api/notes/${user_id}/${recipe_id}`, {
  })
  .then(res => {return res.data})
}

export const removeNote = function(user_id, recipe_id, note_id) {
  return axios.delete(`/api/notes/${user_id}/${recipe_id}/${note_id}`, {
  })
  .then(res => {return res.data})
}
