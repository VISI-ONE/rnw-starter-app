/* eslint-disable no-plusplus, no-return-assign */
import { Platform } from 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import App from './App';

const tree = renderer.create(<App />);
describe('App component', () => {
  it('renders without errors', () => {
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders properly - ' + Platform.OS, () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
