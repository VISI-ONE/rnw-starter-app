import { SET_LOCALE } from './types';

export const setLocale = currentLocale => ({
  type: SET_LOCALE,
  currentLocale
});
