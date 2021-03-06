const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/canofbooks', {useNewUrlParser: true, useUnifiedTopology: true});

// this needs to be AFTER running mongoose.connect
const User = require('./models/User');

// seed the database with a book
// const myUser = new User({ email: 'stacey.teltser@gmail.com', books: [{name: 'If You Then Me', description: 'an awesome book', status: 'available'}, {name: 'Phoenix Project', description: 'must read', status: 'unavailable'}]});
// myUser.save(function (err) {
//   if (err) return console.log(err);
//   else console.log('saved the user');
// });

app.get('/', (request, response) => {
  response.send('success!');
});

app.get('/all', (req, res) => {
  // get all the books from the database
  User.find((err, databaseRes) => {
    // send them in the response
    res.send(databaseRes);
  });
});

app.get('/books', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, {}, async function(err, user){
    User.find({email: req.query.email}, (err, databaseRes) => {
      res.send(databaseRes);
    });
  })
})

app.listen(PORT, () => console.log(`PORT is listening on ${PORT}`));