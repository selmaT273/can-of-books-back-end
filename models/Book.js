const mongoose = require('mongoose');
const { Schema } = mongoose;

//mongoose will always give us an id, we don't need to explicitly state one
const bookSchema = new Schema({
  name: String,
  description: String,
  status: String,
});

var Book = mongoose.model('Book', bookSchema);

// export the model
module.exports = [Book, bookSchema];