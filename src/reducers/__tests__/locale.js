import { SET_LOCALE } from '../../actions/types';

jest.mock('../../utils/locales/index', () => () => ({ login: 'Login' }));
const fakeState = { test: 'fakeState' };

const localeReducer = require('../locale').default;

describe('Locale reducer', () => {
  it('throw an error without an action', () => {
    expect(() => localeReducer(fakeState)).toThrow();
  });

  it('return the same state without a matching action.type', () => {
    const newState = localeReducer(fakeState, { type: 'fakeAction' });
    expect(newState).toEqual(fakeState);
  });

  it('return the proper initialState when called without a state', () => {
    const newState = localeReducer(undefined, { type: 'fakeAction' });
    expect(newState).toEqual({
      currentLocale: 'en-US',
      translations: { login: 'Login' },
    });
  });

  it('return the proper state for a SET_LOCALE action type', () => {
    const newState = localeReducer(fakeState, {
      type: SET_LOCALE,
      currentLocale: 'test locale',
    });
    expect(newState).toEqual({
      currentLocale: 'test locale',
      translations: { login: 'Login' },
      test: 'fakeState',
    });
  });
});
