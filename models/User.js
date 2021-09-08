const mongoose = require('mongoose');
const { Schema } = mongoose;

//mongoose will always give us an id, we don't need to explicitly state one
const Book = require('./Book');
const bookSchema = Book[1];

const userSchema = new Schema({
  email: String,
  // the data type for books is an array of bookSchema
  books: [bookSchema],
})

// make a model out of the schema
var User = mongoose.model('User', userSchema);

// export the model
module.exports = User;