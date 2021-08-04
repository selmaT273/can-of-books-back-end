const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/canofbooks', {useNewUrlParser: true, useUnifiedTopology: true});

// this needs to be AFTER running mongoose.connect
const User = require('./models/User');

// seed the database with a book
const myUser = new User({ email: 'booooo', books: [{name: 'Halloween', description: 'a great tale', status: 'unavailable'}]});
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
  // when front end is sending req, refactor to User.find({email: `${req.body.JWToken}`);
  User.find({email: 'booooo'}, (err, databaseRes) => {
    res.send(databaseRes);
  });
})

app.listen(PORT, () => console.log(`PORT is listening on ${PORT}`));