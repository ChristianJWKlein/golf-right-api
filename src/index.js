const courses = require('./courses.json');

const courseInfo = courses.map((info) => info.rate.rating);
console.log(courseInfo);
