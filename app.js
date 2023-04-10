// Require Libraries
const express = require('express');
const exphbs = require('express-handlebars');
require('dotenv').config();

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

// Require controllers
require('./controllers/posts')(app)

// Start Server

app.listen(3000, () => {
  console.log('Gif Search listening on port localhost:3000!');
});