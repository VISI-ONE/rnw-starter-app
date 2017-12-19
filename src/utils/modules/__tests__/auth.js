import { AsyncStorage } from 'react-native';
import {
  login,
  logout,
  isTokenExpired,
  getUserToken,
  setUserToken,
  checkUserToken
} from '../auth';

const DATE_TO_USE = new Date('2016');
const _Date = Date;
global.Date = jest.fn(() => DATE_TO_USE);

const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9yIiwiZGVhbGVySWQiOiI3IiwidXNlcklkIjoiNTQiLCJpYXQiOjE1MTMxODA4MjAsImV4cCI6MTUxMzI2NzIyMH0.S4E8oqYmn6E6iDL_TsO1euZS_6K6KsxGrfobA8CZY9I';
const brokenToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9yIiwiZGVhbGVySWQiOiI3IiwidXNlcklkIjoiNTQiLCJpYXQiOMjAsImV4cCI6MTUxMzI2NzIyMH0.S4E8oqYmn6E6iDL_TsO1euZS_6K6KsxGrfob%^&%9I';
AsyncStorage.setItem = jest.fn();
AsyncStorage.removeItem = jest.fn();
AsyncStorage.getItem = jest.fn(() => Promise.resolve(fakeToken));

const successCall = [
  ['authtoken', fakeToken],
  ['dealerId', '7'],
  ['userId', '54'],
];

describe('Auth module', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('login should call the login endpoint with the username and pass and return the response', () => {
    fetch.mockResponseOnce(JSON.stringify({ fakeToken }));
    return login('asd', '123').then(response => {
      expect(response).toEqual({ fakeToken });
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0]).toEqual([
        {
          body: 'username=asd&password=123',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          method: 'POST'
        }
      ]);
    });
  });

  it('login should call setUserToken when receives token', () => {
    fetch.mockResponseOnce(JSON.stringify({ status: 'success', token: fakeToken }));
    AsyncStorage.setItem.mock.calls = [];
    return login('asd', '123').then(() => {
      expect(AsyncStorage.setItem.mock.calls.length).toEqual(3);
      expect(AsyncStorage.setItem.mock.calls).toEqual(successCall);
    });
  });

  it('logout should remove all items AsyncStorage saves on the user', () => {
    AsyncStorage.removeItem.mock.calls = [];
    logout();
    expect(AsyncStorage.removeItem.mock.calls).toEqual([
      ['authtoken'], ['dealerId'], ['userId']
    ]);
  });


  it('getUserToken should call isTokenExpired and return the token if not expired', () => {
    return getUserToken(fakeToken).then(result => {
      expect(result).toEqual(fakeToken);
    });
  });

  it('setUserToken should save the token and the data from it', () => {
    AsyncStorage.setItem.mock.calls = [];
    setUserToken(fakeToken);
    expect(AsyncStorage.setItem.mock.calls.length).toEqual(3);
    expect(AsyncStorage.setItem.mock.calls).toEqual(successCall);
  });

  it('checkUserToken should call getUserToken and request refresh endpoint and return response', () => {
    const response = { status: 'success', newToken: fakeToken };
    fetch.mockResponseOnce(JSON.stringify(response));
    AsyncStorage.setItem.mock.calls = [];
    return checkUserToken().then((res) => {
      expect(AsyncStorage.setItem.mock.calls.length).toEqual(3);
      expect(AsyncStorage.setItem.mock.calls).toEqual(successCall);
      expect(res).toEqual(response);
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0]).toEqual([
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            Bearer: fakeToken
          },
          method: 'GET'
        }
      ]);
    });
  });

  it('checkUserToken should return null when has no token and not call refresh endpoint', () => {
    AsyncStorage.getItem = jest.fn(() => Promise.resolve());
    AsyncStorage.setItem.mock.calls = [];
    return checkUserToken().then((res) => {
      expect(res).toEqual(null);
      expect(fetch.mock.calls.length).toEqual(0);
      expect(AsyncStorage.setItem.mock.calls.length).toEqual(0);
      expect(AsyncStorage.setItem.mock.calls).toEqual([]);
    });
  });

  it('isTokenExpired should return false since token is not expired', () => {
    const result = isTokenExpired(fakeToken);
    expect(result).toEqual(false);
  });

  it('isTokenExpired should return true since token is expired', () => {
    global.Date = _Date;
    const result = isTokenExpired(fakeToken);
    expect(result).toEqual(true);
  });

  it('isTokenExpired should return true since token is broken', () => {
    const result = isTokenExpired(brokenToken);
    expect(result).toEqual(true);
  });
});
