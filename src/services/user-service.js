import axios from 'axios';

export const getUserInfo = function() {
  return axios.get('/me')
  .then(res => {return res.data[0]})
}
