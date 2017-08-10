const app = require('../index.js')
const db = app.get('db')

var exports = module.exports = {}

exports.addNote = (req, res) => {
  db.addNote([req.body.user_id, req.body.recipe_id, req.body.notes], (err, response) => {
    if (err) {
      console.log(err)
    }
    res.status(200).send(response);
  })
}

exports.removeNote = (req, res) => {
  db.removeNote([req.params.user_id, req.params.recipe_id, req.params.note_id], (err, response) => {
    if (err) {
      console.log(err)
    }
    res.status(200).send(response);
  })
}

exports.getNotes = (req, res) => {
  db.getNotes([req.params.user_id, req.params.recipe_id], (err, response) => {
    if (err) {
      console.log(err)
    }
    res.status(200).send(response);
  })
}
