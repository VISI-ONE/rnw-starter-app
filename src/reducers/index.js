import { combineReducers } from 'redux';
import auth from './auth';
import locale from './locale';
import qr from './qr';

export default combineReducers({
  locale,
  auth,
  qr,
});
