/* eslint-disable no-cond-assign, no-bitwise, no-mixed-operators, no-plusplus */
// from https://stackoverflow.com/questions/42829838/react-native-atob-btoa-not-working-without-remote-js-debugging#42833475
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const decode = (input = '') => {
  const str = input.replace(/=+$/, '');
  let output = '';

  if (str.length % 4 === 1) {
    // failed to decode
    return null;
  }
  for (let bc = 0, bs = 0, buffer, i = 0;
    buffer = str.charAt(i++);

    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
    bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
  ) {
    buffer = chars.indexOf(buffer);
  }

  return output;
};

const decodeJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(decode(base64));
};

export default decodeJwt;
