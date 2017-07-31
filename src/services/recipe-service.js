import axios from 'axios';
import {API_KEY} from '../config.js'
import {MASHAPE_KEY} from '../config.js'

export const getTopRecipes = function() {
  return axios.get(`https://community-food2fork.p.mashape.com/search?key=${API_KEY}&sort=r`, {
    "headers": MASHAPE_KEY
  })
  .then(res => {console.log(res.data); return res.data})
}
