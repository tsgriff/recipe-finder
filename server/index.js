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
app.use(session(config_server.clientSecret))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors())


// LISTEN/PORT //

app.get('*', function (request, response){
response.sendFile(path.join(__dirname, '.././build/', 'index.html'))
})

const port = 5000

app.listen(port, () => {
  console.log("Started server on port", port)
});
