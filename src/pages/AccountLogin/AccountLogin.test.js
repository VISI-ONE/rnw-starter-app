/* eslint-disable no-plusplus, no-return-assign */
import { Text, Platform, TextInput, View } from 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { styles, mapStateToProps, mapDispatchToProps, AccountLogin } from './AccountLogin';
import {
  login as loginAction
} from '../../actions/auth';
import Button from '../../components/Button/Button';
import translations from '../../utils/locales/en-US';
import Routing from '../../utils/routing';
import Router from '../../__mocks__/Router';
import { isWeb } from '../../utils/common';

const { Redirect } = Routing;

const fakeUserData = {
  email: 'fakeUser1',
  password: 123456
};

describe('AccountLogin page', () => {
  describe('rendering', () => {
    it('render properly - ' + Platform.OS, () => {
      const login = jest.fn();
      const reactTree = renderer.create(<AccountLogin isLoggedIn={false} dispatchLogin={login} translations={translations} />);
      expect(reactTree.toJSON()).toMatchSnapshot();
    });

    it('has the right components and structure', () => {
      const login = jest.fn();
      const enzymeTree = shallow(<AccountLogin isLoggedIn={false} dispatchLogin={login} translations={translations} />);
      const content = (
        <View style={styles.container}>
          <View style={styles.loginForm}>
            <Text style={styles.label}>{translations.login__email__label}</Text>
            <TextInput
              onChangeText={this.onEmailChange}
              placeholder={translations.login__email__placeholder}
              style={styles.textinput}
              onKeyPress={this.handleKeyDown}
            />
            <Text style={styles.label}>{translations.login__password__label}</Text>
            <TextInput
              secureTextEntry
              onChangeText={this.onPassChange}
              placeholder={translations.login__password__placeholder}
              style={styles.textinput}
              onKeyPress={this.handleKeyDown}
            />
            <Button style={styles.button} textStyle={styles.buttonText} onClick={this.submit} text={translations.login} />
          </View>
        </View>
      );
      const wrapper = shallow(content);

      expect(enzymeTree.html()).toEqual(wrapper.html());
    });

    it('renders an error when has one in the state', () => {
      const login = jest.fn();
      const error = 'error';
      const tree = shallow(<AccountLogin isLoggedIn={false} dispatchLogin={login} translations={translations} />);
      const RenderedError = shallow(<Text>{error}</Text>);
      tree.setState({ email: '', password: '', error });
      const errorNode = tree.find({ children: error });
      expect(errorNode.length).toEqual(1);
      expect(errorNode.html()).toEqual(RenderedError.html());
    });
  });

  describe('functionality', () => {
    it('submit function should submits the form and calls the login action', () => {
      const login = jest.fn();
      const tree = shallow(<AccountLogin isLoggedIn={false} dispatchLogin={login} translations={translations} />);
      const btn = tree.find({ text: translations.login });

      tree.setState(fakeUserData);
      btn.simulate('click');
      expect(login).toBeCalledWith({ email: fakeUserData.email });
    });

    it('redirects to home when user is logged in', () => {
      const login = jest.fn();
      const tree = renderer.create(
        <Router>
          <AccountLogin isLoggedIn dispatchLogin={login} translations={translations} />
        </Router>
      ).root;

      expect(tree.findByType(Redirect).props.to).toEqual('/');
    });

    it('onEmailChange should store the email in the state', () => {
      const login = jest.fn();
      const value = 'test';
      const instance = renderer.create(
        <AccountLogin dispatchLogin={login} translations={translations} />
      ).getInstance();
      instance.onEmailChange(value);

      expect(instance.state).toEqual({ email: value, password: '', error: '' });
    });

    it('onPassChange should store the password in the state', () => {
      const login = jest.fn();
      const value = 'test';
      const instance = renderer.create(
        <AccountLogin dispatchLogin={login} translations={translations} />
      ).getInstance();
      instance.onPassChange(value);

      expect(instance.state).toEqual({ email: '', password: value, error: '' });
    });

    it('handleKeyDown calls should not call submit when receives any other key except for Enter', () => {
      const login = jest.fn();
      const key = 'Enter';
      const instance = renderer.create(
        <AccountLogin dispatchLogin={login} translations={translations} />
      ).getInstance();
      instance.submit = jest.fn();

      instance.handleKeyDown(isWeb ? { key: 'Up' } : { nativeEvent: { key: 'Up' } });
      expect(instance.submit).not.toBeCalled();
      expect(instance.submit.mock.calls.length).toEqual(0);

      instance.handleKeyDown(isWeb ? { key: 'Down' } : { nativeEvent: { key: 'Down' } });
      expect(instance.submit).not.toBeCalled();
      expect(instance.submit.mock.calls.length).toEqual(0);
      instance.handleKeyDown(isWeb ? { key: '42' } : { nativeEvent: { key: '42' } });
      expect(instance.submit).not.toBeCalled();
      expect(instance.submit.mock.calls.length).toEqual(0);

      instance.handleKeyDown(isWeb ? { key } : { nativeEvent: { key } });

      expect(instance.submit).toBeCalled();
      expect(instance.submit.mock.calls.length).toEqual(1);
    });
  });

  describe('redux', () => {
    it('mapStateToProps', () => {
      const fakeState = { auth: { isLoggedIn: false }, locale: { translations } };
      const props = mapStateToProps(fakeState);
      expect(props).toEqual({
        isLoggedIn: false,
        translations: {
          login__email__label: translations.login__email__label,
          login__password__label: translations.login__password__label,
          login__email__placeholder: translations.login__email__placeholder,
          login__password__placeholder: translations.login__password__placeholder,
          login: translations.login,
        },
      });
    });

    it('mapDispatchToProps should return the functions that would create the proper actions ', () => {
      const mockDispatch = jest.fn();
      const props = mapDispatchToProps(mockDispatch);
      expect(Object.keys(props)).toEqual(['dispatchLogin']);
      expect(typeof props.dispatchLogin).toEqual('function');
      props.dispatchLogin(fakeUserData);

      expect(mockDispatch.mock.calls.length).toEqual(1);
      expect(mockDispatch).toBeCalledWith(loginAction(fakeUserData));
    });
  });
});
