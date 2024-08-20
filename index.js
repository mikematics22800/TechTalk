const path = require('path'); // Core module for handling and transforming file paths
const express = require('express'); // Express framework for building web applications
const session = require('express-session'); // Middleware for handling sessions
const exphbs = require('express-handlebars'); // Handlebars view engine for Express
const routes = require('./controllers'); // Importing routes from the controllers directory
const sequelize = require('./config/connection'); // Sequelize instance for database connection
const SequelizeStore = require('connect-session-sequelize')(session.Store); // Sequelize session store

const app = express(); // Initializing the Express application
const PORT = process.env.PORT || 3001; // Setting the port for the server

const store = new SequelizeStore({
  db: sequelize
});

store.sync();

// Creating a session configuration object
app.use(session({
  secret: process.env.SESSION_SECRET, // Secret for signing the session ID cookie
  cookie: {}, // Cookie options (can be customized)
  resave: false, // Prevents session from being saved back to the session store if it wasn't modified
  saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
  store: store // Using Sequelize to store session data
}));

// Creating an instance of Handlebars
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
});

// Setting Handlebars as the view engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serving static files from the 'public' directory

const checkAuth = (req, res, next) => {
  // If the user isn't logged in, redirect them to the login route. 
  if (!req.session.logged_in && !req.url.startsWith('auth')) {
    res.redirect('/auth/login');
  // If the user is logged in, redirect them to the home route.
  } else if (req.session.logged_in && !req.url.startsWith('home')) {
    res.redirect('/home/');
  } else {
    next();
  }
};

// Using the routes from the controllers directory and checking authentication
app.use(routes, checkAuth);

// Syncing the Sequelize models and starting the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}.`));
});