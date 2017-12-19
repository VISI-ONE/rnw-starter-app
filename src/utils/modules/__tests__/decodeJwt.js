import decodeJwt from '../decodeJwt';

const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9yIiwiZGVhbGVySWQiOiI3IiwidXNlcklkIjoiNTQiLCJpYXQiOjE1MTMxODA4MjAsImV4cCI6MTUxMzI2NzIyMH0.S4E8oqYmn6E6iDL_TsO1euZS_6K6KsxGrfobA8CZY9I';
const brokenToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9yIiwiZGVhbGVySWQiOiI3IiwidXNlcklkIjoiNTQiLCJpYXQiOMjAsImV4cCI6MTUxMzI2NzIyMH0.S4E8oqYmn6E6iDL_TsO1euZS_6K6KsxGrfob%^&%9I';

describe('decodeJwt module', () => {
  it('should decode a jwt token properly', () => {
    const result = decodeJwt(fakeToken);
    expect(result).toEqual({
      dealerId: '7',
      exp: 1513267220,
      iat: 1513180820,
      userId: '54',
      username: 'or',
    });
  });
  it('should throw an error with a bad token', () => {
    expect(() => decodeJwt(brokenToken)).toThrow();
  });
});
