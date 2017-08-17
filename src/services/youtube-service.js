import axios from 'axios';
import {YOUTUBE_API_KEY} from '../config.js'


export const videoSearch = function(term, page) {
  return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&totalResults=30&order=viewCount&pageToken=${page}&q=${term}&type=video&key=${YOUTUBE_API_KEY}`)
  .then(videos => {return videos.data})
}
