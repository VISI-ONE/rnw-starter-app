import { AsyncStorage } from 'react-native';
import decodeJwt from './decodeJwt';
import { isDev } from '../common';
const TOKEN_KEY = 'authtoken';

const request = (url, method, body, extraHeaders) => {
	let headers = {
		'Content-Type': 'application/json'
	};

	if (extraHeaders) {
		headers = { ...headers, ...extraHeaders };
	}

	const options = {
    method,
    headers,
  };

	if (method === 'POST') {
		options.body = body;
	}
	return fetch(url, options)
  .then(res => res.json());
};

export const logout = () => {
	AsyncStorage.removeItem(TOKEN_KEY);
};

export const login = (username, password) => {
  return request('some-url', 'POST', JSON.stringify({ username, password }))
	.then(res => {
		if (res && res.status === 'success' && res.token) {
			setUserToken(res.token);
		}
		return res;
	})
  .catch(err => err);
};

export const isTokenExpired = (token) => {
	try {
		const decodedToken = decodeJwt(token);
		const tokenExperationTimestamp = parseInt(decodedToken.exp, 10); // eg 1505727610 // seconds since UTC 1970.. .

		const dateNow = new Date();
		const clientTimestamp = Math.round(dateNow.getTime() / 1000);

		if (tokenExperationTimestamp < clientTimestamp) {
			// TokenExperation is in the past (less then Now)
			return true;
		}
		// TokenExperation is in the future (more then Now)
		return false;
	} catch (e) {
		return true;
	}
};

export const getUserToken = () => {
	return AsyncStorage.getItem(TOKEN_KEY)
	.then(token => {
		if (token && !isTokenExpired(token)) {
			return token;
		}
		return undefined;
	});
};

export const setUserToken = (token) => {
	if (token) {
		try {
			AsyncStorage.setItem(TOKEN_KEY, token);
		} catch (e) {} // eslint-disable-line no-empty
	}
};

export const checkUserToken = () => {
	return getUserToken()
	.then(token => {
		if (token) {
			return request('refresh url', 'GET', null, { Bearer: token })
			.then(res => {
				if (res && res.status === 'success' && res.newToken) {
					setUserToken(res.newToken);
				}
				return res;
			})
		  .catch(err => err);
		}
		return null;
	});
};
