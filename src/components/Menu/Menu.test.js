import React from 'react';
import { View, Platform } from 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { Menu, styles } from './Menu';
import Router from '../../__mocks__/Router';


jest.mock('../LocalePicker/LocalePicker', () => {
  const View = require('react-native').View; // eslint-disable-line
  const MockComponent = () => <View isLocalePicker />;
  return MockComponent;
});

describe('Menu component', () => {
  it('renders properly - ' + Platform.OS, () => {
    const tree = renderer.create(
      <Router>
        <Menu isLoggedIn />
      </Router>
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('render the proper structure', () => {
    const tree = renderer.create(
      <Router>
        <Menu isLoggedIn />
      </Router>
    ).root;

    expect(tree.findByType(View).props.style).toEqual(styles.container);
    expect(tree.findByProps({ to: '/' }).props.style).toEqual(styles.link);
    expect(tree.findByProps({ to: '/' }).props.children).toEqual('Home');
    expect(tree.findByProps({ to: '/About' }).props.style).toEqual(styles.link);
    expect(tree.findByProps({ to: '/About' }).props.children).toEqual('About');
    expect(tree.findByProps({ to: '/Contact' }).props.style).toEqual(styles.link);
    expect(tree.findByProps({ to: '/Contact' }).props.children).toEqual('Contact');
    expect(tree.findByProps({ isLocalePicker: true }).props.isLocalePicker).toEqual(true);
  });
});
