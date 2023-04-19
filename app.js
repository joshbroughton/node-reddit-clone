// Require Libraries
const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const checkAuth = require('./middleware/checkAuth');

// App Setup
const app = express();
app.use(express.static('public'));

// db setup
require('./data/reddit-db');

// Middleware
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkAuth);

// Require controllers
require('./controllers/posts')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);

// Start Server

app.listen(3000, () => {
  console.log('Reddit clone server listening on port localhost:3000!');
});

module.exports = app;