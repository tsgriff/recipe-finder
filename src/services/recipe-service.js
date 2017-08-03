import axios from 'axios';
import {API_KEY} from '../config.js'
import {MASHAPE_KEY} from '../config.js'

export const getTopRecipes = function() {
  return axios.get(`https://community-food2fork.p.mashape.com/search?key=${API_KEY}&sort=r`, {
    "headers": MASHAPE_KEY
  })
  .then(res => {return res.data})
}

export const getRecipes = function(term) {
  return axios.get(`https://community-food2fork.p.mashape.com/search?key=${API_KEY}&q=${term}`, {
    "headers": MASHAPE_KEY
  })
  .then(res => {return res.data.recipes})
}

export const getRecipesPageTwo = function(term) {
  return axios.get(`https://community-food2fork.p.mashape.com/search?key=${API_KEY}&q=${term}&page=2`, {
    "headers": MASHAPE_KEY
  })
  .then(res => {return res.data.recipes})
}

export const getDetails = function(id) {
  return axios.get(`https://community-food2fork.p.mashape.com/get?key=${API_KEY}&rId=${id}`, {
    "headers": MASHAPE_KEY
  })
  .then(res => {return res.data.recipe})
}
