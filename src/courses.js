const { connectDb } = require('./connectDb');

exports.getAllCourses = (req, res) => {
  const db = connectDb();
  db.collection('courses')
    .get()
    .then((snapshot) => {
      const courseList = snapshot.docs.map((doc) => {
        let course = doc.data();
        course.id = doc.id;
        return course;
      });
      res.send(courseList);
    })
    .catch((err) => res.status(500).send(err));
};
