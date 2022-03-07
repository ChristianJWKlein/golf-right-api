const { connectDb } = require('../../src/connectDb');

// create an update course rating function;
// params are courseId and rating object;
// {
// "atmosphere": 7.5,
// "amenities": 8.4,
// "course_quality": 8.5,
// "bang_for_your_buck": 10
// }

const updateCourseRating = async (courseId, rating) => {
  db.collection('courses')
    .doc(req.params.id)
    .get()
    .then((doc) => {
      const body = req.body.rating;
      const newRating = Number(req.body.rating);
      let newRatings = doc.data().ratings || [];
      newRatings.push(newRating);
      const newCount = newRatings.length;
      const newRatingsSum = newRatings.reduce((accum, curr) => accum + curr, 0);
      const newAvgRating = newRatingsSum / newCount;
      const newRatingObj = {
        ratings: newRatings,
        rating: newAvgRating,
        numRatings: newCount,
      };
      db.collection('courses')
        .doc(req.params.id)
        .update({ rate: newRatingObj })
        .then(() => {
          res.status(200).send(`Thank you for Rating ${req.params.id} `);
        });
    })
    .catch((err) => res.status(500).send(err));
};
