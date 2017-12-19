import { LOGIN, LOGOUT } from './types';

export const login = user => ({
  type: LOGIN,
  user
});

export const logout = () => ({
  type: LOGOUT
});
