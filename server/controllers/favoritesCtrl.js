const app = require('../index.js')
const db = app.get('db')

var exports = module.exports = {}

exports.addToFavoriteRecipes = (req, res) => {
  db.addToFavoriteRecipes([req.body.user_id, req.body.recipe_id, req.body.title, req.body.photo], (err, response) => {
    if (err) {
      console.log(err)
    }
    res.status(200).send(response);
  })
}

exports.removeFromFavoriteRecipes = (req, res) => {
  db.removeFromFavoriteRecipes([req.params.user_id, req.params.recipe_id], (err, response) => {
    if (err) {
      console.log(err)
    }
    res.status(200).send(response);
  })
}

exports.getFavoriteRecipes = (req, res) => {
  console.log(req.params.user_id);
  db.getFavoriteRecipes([req.params.user_id], (err, response) => {
    if (err) {
      console.log(err)
    }
    res.status(200).send(response);
  })
}
