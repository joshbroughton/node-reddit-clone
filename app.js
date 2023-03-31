// Require Libraries
const express = require('express');
const exphbs = require('express-handlebars');
require('dotenv').config();


// App Setup
const app = express();
app.use(express.static('public'));
// Middleware


app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views')

// Routes
  // ROUTES
  app.get('/', (req, res) => {
    res.render('home');
  })

// Start Server

app.listen(3000, () => {
  console.log('Gif Search listening on port localhost:3000!');
});