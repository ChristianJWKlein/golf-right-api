const { connectDb } = require('../../src/connectDb');

// create an update course rating function;
// params are courseId and rating object;
// {
// "atmosphere": 7.5,
// "amenities": 8.4,
// "course_quality": 8.5,
// "bang_for_your_buck": 10
// }

exports.updateCourseRating = (req, res) => {
  if (
    req.body.rating.bang_for_your_buck > 10 ||
    req.body.rating.bang_for_your_buck < 1 ||
    req.body.rating.bang_for_your_buck === null ||
    req.body.rating.bang_for_your_buck === undefined ||
    isNaN(req.body.rating.bang_for_your_buck) ||
    req.body.rating.atmosphere > 10 ||
    req.body.rating.atmosphere < 1 ||
    req.body.rating.atmosphere === null ||
    req.body.rating.atmosphere === undefined ||
    isNaN(req.body.rating.atmosphere) ||
    req.body.rating.amenities > 10 ||
    req.body.rating.amenities < 1 ||
    req.body.rating.amenities === null ||
    req.body.rating.amenities === undefined ||
    isNaN(req.body.rating.amenities) ||
    req.body.rating.course_quality > 10 ||
    req.body.rating.course_quality < 1 ||
    req.body.rating.course_quality === null ||
    req.body.rating.course_quality === undefined ||
    isNaN(req.body.rating.course_quality)
  ) {
    res.status(403).send({ message: 'Invalid entry' });
    return;
  }
  const db = connectDb();
  db.collection('courses')
    .doc(req.params.id)
    .get()
    .then((doc) => {
      const oldData = doc.data();
      let newRate = oldData.rate;

      for (const key of Object.keys(req.body.rating)) {
        const newRating = Number(req.body.rating[key]);
        let newRatings = oldData.rate.ratings[key] || [];
        newRatings.push(newRating);
        // res.send({ key, newRating, newRatings });
        // return;
        const newCount = newRatings.length;
        const newRatingsSum = newRatings.reduce(
          (accum, curr) => accum + curr,
          0
        );
        const newAvgRating = newRatingsSum / newCount;
        newRate.rating[key] = newAvgRating;
        newRate.ratings[key] = newRatings;
      }
      // now update overall rating:
      newRate.overall_rating =
        (newRate.rating.atmosphere +
          newRate.rating.amenities +
          newRate.rating.course_quality +
          newRate.rating.bang_for_your_buck) /
        4;

      //res.send(newRate);
      db.collection('courses')
        .doc(req.params.id)
        .update({ rate: newRate })
        .then(() => {
          res
            .status(200)
            .send({ message: `Thank you for Rating ${req.params.id} ` });
        });
    })
    .catch((err) => res.status(500).send(err));
};
