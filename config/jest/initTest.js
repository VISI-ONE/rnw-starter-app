/* eslint-disable arrow-body-style */
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });

// ============== global Mocks
global.fetch = require('jest-fetch-mock');

jest.mock('react-native-web/dist/components/Touchable/Touchable.js', () => {
  return require('./__mocks__/Touchable.js').default;
});
jest.mock('../../node_modules/react-native-web/dist/components/Touchable/Touchable.js', () => {
  return require('./__mocks__/Touchable.js').default;
});
