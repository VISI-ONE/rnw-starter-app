import authReducer from '../auth';
import { LOGIN, LOGOUT } from '../../actions/types';

const fakeState = { test: 'fakeState' };

describe('Auth reducer', () => {
  it('throw an error without an action', () => {
    expect(() => authReducer(fakeState)).toThrow();
  });

  it('return the same state without a matching action.type', () => {
    const newState = authReducer(fakeState, { type: 'fakeAction' });
    expect(newState).toEqual(fakeState);
  });

  it('return the proper initialState when called without a state', () => {
    const newState = authReducer(undefined, { type: 'fakeAction' });
    expect(newState).toEqual({
      user: null,
      isLoggedIn: false
    });
  });

  it('return the proper state for a LOGIN action type', () => {
    const newState = authReducer(fakeState, {
      type: LOGIN,
      user: { name: 'fakeUser' }
    });
    expect(newState).toEqual({
      test: 'fakeState',
      user: { name: 'fakeUser' },
      isLoggedIn: true
    });
  });

  it('return the proper state for a LOGOUT action type adn call logout function from auth module', () => {
    const newState = authReducer(fakeState, { type: LOGOUT });
    expect(newState).toEqual({
      test: 'fakeState',
      user: null,
      isLoggedIn: false
    });
  });
});
