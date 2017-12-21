import { combineReducers } from 'redux';
import auth from './auth';
import locale from './locale';

export default combineReducers({
  locale,
  auth,
});
