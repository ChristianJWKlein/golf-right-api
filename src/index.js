const express = require('express');
const cors = require('cors');

//const courses = require('./courses.json');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log('Listening on Port: ', PORT);
});
