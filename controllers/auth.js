// require middleware
const jwt = require('jsonwebtoken');

// require models
const User = require('../models/user');


module.exports = (app) => {
  // SIGN UP FORM
  app.get('/sign-up', (req, res) => res.render('sign-up'));

  // CREATE USER (SIGN UP POST)
  app.post('/sign-up', async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60d'});
      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
      res.redirect('/');
    } catch (err) {
      console.log(err);
      return res.status(400).send({ err });
    }
  });
};