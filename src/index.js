const courses = require('./courses.json');

const courseInfo = courses.map(({ name, address, rate }) => ({
  name,
  address,
  rate,
}));
console.log(courseInfo);
