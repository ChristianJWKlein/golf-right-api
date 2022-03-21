const courses = require('../assets/yetEvenMoreCourses.json');
const { connectDb } = require('../connectDb');

const db = connectDb();

db.collection('courses')
  .add(courses[8])
  .then((doc) => {
    console.log('added golf course', doc.id);
  })
  .catch((err) => {
    console.log(err);
  });
