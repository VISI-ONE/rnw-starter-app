import { View, Text, Image, Platform } from 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { styles, mapStateToProps, mapDispatchToProps, Home } from './Home';
import { logout as logoutAction } from '../../actions/auth';
import Button from '../../components/Button/Button';
import translations from '../../utils/locales/en-US';

describe('Home page', () => {
  describe('rendering', () => {
    beforeEach(() => {
      fetch.resetMocks();
    });
    it('render properly - ' + Platform.OS, () => {
      fetch.mockResponseOnce(JSON.stringify({}));
      const login = jest.fn();
      const logout = jest.fn();
      const tree = renderer.create(<Home login={login} logout={logout} translations={translations} />);
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('render properly with qr code - ' + Platform.OS, () => {
      fetch.mockResponseOnce(JSON.stringify({}));
      const logout = jest.fn();
      const tree = renderer.create(
        <Home logout={logout} translations={translations} />
      );
      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('render the proper structure', () => {
      fetch.mockResponseOnce(JSON.stringify({}));
      const logout = jest.fn();
      const tree = shallow(<Home logout={logout} translations={translations} />);
      const content = shallow(
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.biggerText}>{translations.home__welcome}</Text>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.image}
            />
            <View style={styles.row}>
              <Button style={styles.button} text="Logout" onClick={logout} textStyle={styles.buttonText} />
            </View>
            <Text style={styles.text}>{translations.home__loggedin}</Text>
          </View>
        </View>
      );

      expect(tree.html()).toEqual(content.html());
    });

    it('render the proper structure with qr code', () => {
      const logout = jest.fn();
      const tree = shallow(<Home logout={logout} translations={translations} />);
      const content = shallow(
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.biggerText}>{translations.home__welcome}</Text>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.image}
            />
            <View style={styles.row}>
              <Button style={styles.button} text="Logout" onClick={logout} textStyle={styles.buttonText} />
            </View>
            <Text style={styles.text}>{translations.home__loggedin}</Text>
          </View>
        </View>
      );

      expect(tree.html()).toEqual(content.html());
    });
  });

  describe('functionality', () => {
    beforeEach(() => {
      fetch.resetMocks();
    });
    it('trigger logout onClick calls logout action', () => {
      fetch.mockResponseOnce(JSON.stringify({}));
      const logout = jest.fn();
      const tree = shallow(<Home logout={logout} translations={translations} />);
      const btn = tree.find({ text: 'Logout' });

      btn.simulate('click');
      expect(logout.mock.calls.length).toEqual(1);
      expect(logout).toBeCalled();
    });
  });

  describe('redux', () => {
    it('mapStateToProps', () => {
      const fakeState = { locale: { translations } };
      const props = mapStateToProps(fakeState);
      expect(props).toEqual({
        translations: {
          home__loggedin: translations.home__loggedin,
          home__welcome: translations.home__welcome,
          logout: translations.logout,
        },
      });
    });

    it('mapDispatchToProps', () => {
      const mockDispatch = jest.fn();
      const props = mapDispatchToProps(mockDispatch);
      expect(Object.keys(props)).toEqual(['logout']);
      expect(typeof props.logout).toEqual('function');
      props.logout();

      expect(mockDispatch.mock.calls.length).toEqual(1);
      expect(mockDispatch).toBeCalledWith(logoutAction());
    });
  });
});
