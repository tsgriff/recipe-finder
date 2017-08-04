import axios from 'axios';
import {API_KEY} from '../config.js'
import {MASHAPE_KEY} from '../config.js'

export const getTopRecipes = function(pageNum) {
  return axios.get(`https://community-food2fork.p.mashape.com/search?key=${API_KEY}&page=${pageNum}&sort=r`, {
    "headers": MASHAPE_KEY
  })
  .then(res => {return res.data.recipes})
}

export const getRecipes = function(term, pageNum) {
  return axios.get(`https://community-food2fork.p.mashape.com/search?key=${API_KEY}&q=${term}&page=${pageNum}`, {
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
