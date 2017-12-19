import qrReducer from '../qr';
import { QR_HIDDEN, QR_VISIBLE, QR_RECEIVED } from '../../actions/types';

const fakeState = { test: 'fakeState' };

describe('Auth reducer', () => {
  it('throw an error without an action', () => {
    expect(() => qrReducer(fakeState)).toThrow();
  });

  it('return the same state without a matching action.type', () => {
    const newState = qrReducer(fakeState, { type: 'fakeAction' });
    expect(newState).toEqual(fakeState);
  });

  it('return the proper initialState when called without a state', () => {
    const newState = qrReducer(undefined, { type: 'fakeAction' });
    expect(newState).toEqual({
      isVisible: false,
      data: null,
    });
  });

  it('return the proper state for a QR_HIDDEN action type', () => {
    const newState = qrReducer(fakeState, {
      type: QR_HIDDEN,
    });
    expect(newState).toEqual({
      test: 'fakeState',
      isVisible: false,
    });
  });

  it('return the proper state for a QR_VISIBLE action type', () => {
    const newState = qrReducer(fakeState, { type: QR_VISIBLE });
    expect(newState).toEqual({
      test: 'fakeState',
      isVisible: true,
    });
  });

  it('return the proper state for a QR_RECEIVED action type', () => {
    const newState = qrReducer(fakeState, { type: QR_RECEIVED, data: { test: 'test' } });
    expect(newState).toEqual({
      test: 'fakeState',
      data: { test: 'test' },
    });
  });
});
