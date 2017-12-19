import React from 'react';
import { Text, Platform } from 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Link from './Link';
import Router from '../../__mocks__/Router';
import Routing from '../../utils/routing';
import { isWeb } from '../../utils/common';

const { Link: NativeLink } = Routing;

const path = '/home';

describe('Link component', () => {
  it('render properly - ' + Platform.OS, () => {
    const tree = renderer.create(
      <Router>
        <Link to={path} style={2} textStyle={3}>
          Test Link
        </Link>
      </Router>
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('render the proper structure', () => {
    const tree = renderer.create(
      <Router>
        <Link to={path} style={2} textStyle={3}>
          Test Link
        </Link>
      </Router>
    ).root;

    expect(tree.findByType(NativeLink).props.to).toEqual(path);
    if (isWeb) {
      expect(tree.findByType(NativeLink).props.className).toEqual(2);
    } else {
      expect(tree.findByType(NativeLink).props.style).toEqual(2);
    }
    expect(tree.findByType(Text).props.style).toEqual(3);
    expect(tree.findByType(Text).props.children).toEqual('Test Link');
  });
});
