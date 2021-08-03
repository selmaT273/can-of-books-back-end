const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/canofbooks', {useNewUrlParser: true, useUnifiedTopology: true});

// this needs to be AFTER running mongoose.connect
const Book = require('./models/Book');

// seed the database with a book
const myBook = new Book({ name: 'HP', description: 'Wizard', status: 'unavailable'});
myBook.save(function (err) {
  if (err) return console.log(err);
  else console.log('saved the book');
});

app.get('/', (request, response) => {
  response.send('success!');
});

app.get('/books', (req, res) => {
  // get all the books from the database
  Book.find((err, databaseRes) => {
    // send them in the response
    res.send(databaseRes);
  });
});


app.listen(PORT, () => console.log(`PORT is listening on ${PORT}`));