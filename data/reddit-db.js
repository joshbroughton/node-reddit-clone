/* Mongoose Connection */
const mongoose = require('mongoose');
const url = 'mongodb://localhost/reddit-db';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected!');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

mongoose.set('debug', true);

module.exports = mongoose.connection;