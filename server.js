const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
  response.send('success!');
});

app.listen(PORT, () => console.log(`PORT is listening on ${PORT}`));