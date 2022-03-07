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

exports.getOneCourse = (req, res) => {
  const db = connectDb();
  db.collection('courses')
    .doc(req.params.id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        res.send(doc.data());
      } else {
        res.status(404).send('No such course!');
      }
    })
    .catch((err) => res.status(500).send(err));
};
