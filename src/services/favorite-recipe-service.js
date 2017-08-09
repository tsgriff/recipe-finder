import axios from 'axios';

export const addToFavoriteRecipes = function(user_id, recipe_id, title, photo) {
  return axios.post('/api/favorite_recipes', {
    user_id, recipe_id, title, photo
  })
  .then(res => {console.log('POST FAVORITE RECIPE:', res.data); return res.data})
}

export const removeFromFavoriteRecipes = function(user_id, recipe_id) {
  return axios.delete(`/api/favorite_recipes/${user_id}/${recipe_id}`, {
  })
  .then(res => {console.log('DELETE FAVORITE RECIPE:', res.data); return res.data})
}

export const getFavoriteRecipes = function(user_id) {
  return axios.get(`/api/favorite_recipes/${user_id}`, {
  })
  .then(res => {console.log('GET FAVORITE RECIPES: ', res.data); return res.data})
}
