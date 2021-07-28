const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/canofbooks', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose is connected!!!!');
})

app.get('/', (request, response) => {
  response.send('success!');
});


app.listen(PORT, () => console.log(`PORT is listening on ${PORT}`));