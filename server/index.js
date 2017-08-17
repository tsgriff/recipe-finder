// DEPENDENCIES //

const express = require('express')
      , bodyParser = require('body-parser')
      , massive = require('massive')
      , session = require('express-session')
      , cors = require('cors')
      , passport = require('passport')
      , Auth0Strategy = require('passport-auth0')
      , config_server = require('./config_server')
      , path = require('path')

// INITIALIZE //

const massiveUri = config_server.MASSIVE_URI;

const db = massive.connectSync({
    connectionString: massiveUri
  })

const app = module.exports = express();
app.set('db', db)
app.use(express.static('.././build'))
app.use(bodyParser.json())
app.use(session(config_server.mySecret))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors())

// AUTH0 //

passport.use(new Auth0Strategy(config_server.authPass, function(accessToken, refreshToken, extraParams, profile, done) {
    db.getUsers([profile.emails[0].value], function(err, user) {
      if (!user[0]) {

        db.storeUser([profile.name.givenName, profile.name.familyName, profile.emails[0].value, profile._json.picture_large], function(err, user) {
            db.getUsers([profile.emails[0].value], function(err, user) {
              return done(err, user)
            })
        })
      }

      else {
        return done(err, user);
      }
    })
}))

app.get('/auth', passport.authenticate('auth0')); //START

app.get('/auth/callback',
  passport.authenticate('auth0', {
    successRedirect: '/profile',
    failureRedirect: '/'
}))

passport.serializeUser(function(user, done) {
   done(null, user);
})

passport.deserializeUser(function(user, done) {
  done(null, user);
})

const userCtrl = require('./controllers/userCtrl')

app.get('/me', userCtrl.me)

app.get('/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})

// CONTROLLERS //

const favoritesCtrl = require('./controllers/favoritesCtrl')
const favoriteVideosCtrl = require('./controllers/favoriteVideosCtrl')
const notesCtrl = require('./controllers/notesCtrl')


// GET //

app.get('/api/favorite_recipes/:user_id', favoritesCtrl.getFavoriteRecipes)
app.get('/api/favorite_videos/:user_id', favoriteVideosCtrl.getFavoriteVideos)
app.get('/api/notes/:user_id/:recipe_id', notesCtrl.getNotes)


// POST //

app.post('/api/favorite_recipes', favoritesCtrl.addToFavoriteRecipes)
app.post('/api/favorite_videos', favoriteVideosCtrl.addToFavoriteVideos)
app.post('/api/notes', notesCtrl.addNote)


// DELETE //

app.delete('/api/favorite_recipes/:user_id/:recipe_id', favoritesCtrl.removeFromFavoriteRecipes)
app.delete('/api/favorite_videos/:user_id/:video_id', favoriteVideosCtrl.removeFromFavoriteVideos)
app.delete('/api/notes/:user_id/:recipe_id/:note_id', notesCtrl.removeNote)



// LISTEN/PORT //

app.get('*', function (request, response){
response.sendFile(path.join(__dirname, '.././build/', 'index.html'))
})

const port = 80

app.listen(port, () => {
  console.log("Started server on port", port)
});
