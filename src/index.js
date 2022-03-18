const express = require('express');
const cors = require('cors');
const {
  getAllCourses,
  getOneCourse,
  rateCourse,
  getTopThreeCourses,
} = require('./courses');

//const courses = require('./courses.json');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/courses', getAllCourses);
app.get('/courses/top3', getTopThreeCourses);
app.get('/courses/:id', getOneCourse);
app.patch('/courses/:id', rateCourse);

module.exports = app;
