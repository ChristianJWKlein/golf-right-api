const sut = require('../src/index');
const supertest = require('supertest');
// const connectDb = require('../src/connectDb');

// describe('GET /courses', () => {
//   it('responds with json', async () => {
//     //Arrange
//     connectDb();
//     const req = supertest(sut);
//     const expectedResult = ('Content-Type', /json/);

//     //Act
//     const res = await req.get('/courses');
//     const actualResult = res.text('application/json');

//     //Assert
//     expect(actualResult).toBe(expectedResult);
//   });
// });

// expect(actualResult).toContain(expectedResult);

describe('GET /courses', function () {
  it('responds with json', async (done) => {
    //arrange
    // const db = connectDb();
    const req = supertest(sut);
    await req
      .get('/courses')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
