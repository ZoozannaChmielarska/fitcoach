// Importing the required modules
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./server/config/db');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./server/routes/auth');
const User = require('./server/models/User');

// Loading environment variables from a .env file
require('dotenv').config();

// Creates an instance of the Express application and sets the port number
const app = express();
const port = process.env.PORT || 3000;

app.use(session({
  secret: 'your session secret', // Secret used to sign the session ID cookie
  resave: false, // Forces the session to be saved back to the session store, even if it wasn't modified
  saveUninitialized: false, // Forces a session that is "uninitialized" to be saved to the store
  cookie: { secure: false } // Specifies whether the cookie should be sent only over HTTPS (false for development)
})); 

// Initializes Passport authentication and session support
app.use(passport.initialize());
app.use(passport.session());

// Serializes the user object to store in the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// Deserializes the user object from the session
passport.deserializeUser(function(id, done) {
  User.findById(id) 
    .then(user => done(null, user))
    .catch(err => done(err));
});

app.use('/auth', authRoutes); // Mounts the authentication routes at the '/auth' URL prefix

connectDB(); // Connects to the database

app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies (for form data)
app.use(express.json()); // Parses JSON bodies

app.use(express.static('public')); // Serves static files from the 'public' directory

app.use(expressLayouts); // Enables the use of EJS layouts
app.set('layout', './layouts/main'); // Sets the default layout file for views
app.set('view engine', 'ejs'); // Sets the view engine to EJS

// Mounts the routes at the root URL
app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/logIn'));
app.use('/', require('./server/routes/signUp'));
app.use('/', require('./server/routes/dashboard'));

// Starts the server on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
