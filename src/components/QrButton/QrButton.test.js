import React from 'react';
import { Platform } from 'react-native';
import { shallow } from 'enzyme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Link from '../Link';
import { QrButton, mapStateToProps } from './QrButton';
import styles from './styles';
import { isWeb } from '../../utils/common';

describe('QrButton component', () => {
  it('renders properly - ' + Platform.OS, () => {
    const tree = renderer.create(
      <QrButton isLoggedIn />
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  describe('functionality', () => {
    it('receives props', () => {
      const tree = shallow(
        <QrButton isLoggedIn />
      );
      if (isWeb) {
        expect(tree.html()).toEqual(null);
      } else {
        const content = shallow(
          <Link style={styles.link} textStyle={styles.text} to="/qr-reader">QR reader</Link>
        );
        expect(tree.html()).toEqual(content.html());
      }
    });

    it('renders null when QrScreen is Visible', () => {
      const tree = shallow(
        <QrButton isLoggedIn isQrScreenVisible />
      );
      expect(tree.html()).toEqual(null);
    });
    it('renders null when is not logged in', () => {
      const tree = shallow(
        <QrButton isQrScreenVisible />
      );
      expect(tree.html()).toEqual(null);
    });
  });

  describe('redux', () => {
    it('mapStateToProps', () => {
      const isLoggedIn = 'isLoggedIn-test';
      const isVisible = 'isVisible-test';
      const fakeState = { auth: { isLoggedIn }, qr: { isVisible } };
      const props = mapStateToProps(fakeState);
      expect(props).toEqual({
        isLoggedIn,
        isQrScreenVisible: isVisible,
      });
    });
  });
});
