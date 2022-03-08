const express = require('express');
const cors = require('cors');
const { getAllCourses, getOneCourse, rateCourse } = require('./courses');

//const courses = require('./courses.json');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/courses', getAllCourses);
app.get('/courses/:id', getOneCourse);
app.patch('/courses/:id', rateCourse);

app.listen(PORT, () => {
  console.log('Listening on Port: ', PORT);
});
