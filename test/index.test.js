const { getAllCourses } = require('../src/courses');
const supertest = require('supertest');
const connectDb = require('../src/connectDb');

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

const mockRequest = () => {
  return {};
};

const mockResponse = () => {
  const res = {};
  res.send = jest
    .fn()
    .mockReturnValue([{ name: 'Palm Beach National Golf Club' }]);
  res.status = jest.fn().mockReturnValue(200);
};

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
