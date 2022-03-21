const { connectDb } = require('./connectDb');
const { updateCourseRating } = require('./services/courses-service');

exports.getAllCourses = (req, res) => {
  const db = connectDb();
  db.collection('courses')
    .orderBy('rate.overall_rating', 'desc')
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

exports.getTopThreeCourses = (req, res) => {
  const db = connectDb();
  db.collection('courses')
    .orderBy('rate.overall_rating', 'desc')
    .limit(3)
    .get()
    .then((snapshot) => {
      const topThreeCourses = snapshot.docs.map((doc) => {
        let course = doc.data();
        course.id = doc.id;
        return course;
      });
      res.send(topThreeCourses);
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
        res.status(404).send({ message: 'No such course!' });
      }
    })
    .catch((err) => res.status(500).send(err));
};

exports.rateCourse = (req, res) => {
  const db = connectDb();
  if (req.body && req.body.rating) {
    updateCourseRating(req, res);
  } else {
    db.collection('courses')
      .doc(req.params.id)
      .update(req.body)
      .then(() => {
        this.getAllCourses(req, res);
      })
      .catch((err) => res.status(500).send(err));
  }
};
