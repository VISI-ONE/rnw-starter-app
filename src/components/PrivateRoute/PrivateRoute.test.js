import React from 'react';
import { Platform, Text } from 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Router from '../../__mocks__/Router';
import { PrivateRoute, mapStateToProps } from './PrivateRoute';
import Routing from '../../utils/routing';

const { Redirect } = Routing;
const FakeRoute = () => <Text>this should not show to unlogged users</Text>;


describe('PrivateRoute component', () => {
  it('renders properly when logged out - ' + Platform.OS, () => {
    const tree = renderer.create(
      <Router>
        <PrivateRoute component={FakeRoute} />
      </Router>
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('renders properly when logged in - ' + Platform.OS, () => {
    const tree = renderer.create(
      <Router>
        <PrivateRoute isLoggedIn component={FakeRoute} />
      </Router>
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  describe('functionality', () => {
    it('redirects to login route when logged out', () => {
      const tree = renderer.create(
        <Router>
          <PrivateRoute component={FakeRoute} />
        </Router>
      ).root;

      expect(tree.findByType(Redirect).props.to.pathname).toEqual('/login');
    });

    it('renders the right Route when logged in', () => {
      const tree = renderer.create(
        <Router>
          <PrivateRoute isLoggedIn component={FakeRoute} />
        </Router>
      ).root;

      expect(tree.findByType(FakeRoute).props.location).toEqual('/');
    });
  });

  describe('redux', () => {
    it('mapStateToProps', () => {
      const fakeState = { auth: { isLoggedIn: 'test' } };
      const props = mapStateToProps(fakeState);
      expect(props).toEqual({
        isLoggedIn: 'test',
      });
    });
  });
});
