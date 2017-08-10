const app = require('../index.js')
const db = app.get('db')

var exports = module.exports = {}

exports.addToFavoriteVideos = (req, res) => {
  db.addToFavoriteVideos([req.body.user_id, req.body.video_id, req.body.title, req.body.channel], (err, response) => {
    if (err) {
      console.log(err)
    }
    res.status(200).send(response);
  })
}

exports.removeFromFavoriteVideos = (req, res) => {
  db.removeFromFavoriteVideos([req.params.user_id, req.params.video_id], (err, response) => {
    if (err) {
      console.log(err)
    }
    res.status(200).send(response);
  })
}

exports.getFavoriteVideos = (req, res) => {
  console.log(req.params.user_id);
  db.getFavoriteVideos([req.params.user_id], (err, response) => {
    if (err) {
      console.log(err)
    }
    res.status(200).send(response);
  })
}
