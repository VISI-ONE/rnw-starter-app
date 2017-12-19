import { LOGIN, LOGOUT } from '../actions/types';
import { logout } from '../utils/modules/auth';

const initialState = {
  user: null,
  isLoggedIn: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true
      };
    case LOGOUT:
      logout();
      return {
        ...state,
        user: null,
        isLoggedIn: false
      };
    default:
      return state;
  }
};
