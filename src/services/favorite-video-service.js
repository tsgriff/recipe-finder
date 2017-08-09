import axios from 'axios';

export const addToFavoriteVideos = function(user_id, video_id, title, channel) {
  return axios.post('/api/favorite_videos', {
    user_id, video_id, title, channel
  })
  .then(res => {return res.data})
}

export const removeFromFavoriteVideos = function(user_id, video_id) {
  return axios.delete(`/api/favorite_videos/${user_id}/${video_id}`, {
  })
  .then(res => {return res.data})
}

export const getFavoriteVideos = function(user_id) {
  return axios.get(`/api/favorite_videos/${user_id}`, {
  })
  .then(res => {return res.data})
}
