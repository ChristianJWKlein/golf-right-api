const sut = require('../src/index');
const supertest = require('supertest');

describe('Verifies all the endpoints', () => {
  it('should return Hello darkness my old friend', async () => {
    //Arrange
    const request = supertest(sut);
    const expectedResult = 'Hello darkness my old friend';

    //Act
    const result = await request.get('/courses');
    const actualResult = result.text;

    //Assert
    expect(actualResult).toBe(expectedResult);
  });
});

// expect(actualResult).toContain(expectedResult);
