import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TextInput, ScrollView, View } from 'react-native';
import { login as loginAction } from '../../actions/auth';
import Button from '../../components/Button';
import Routing from '../../utils/routing';
import { isWeb, extractValueFromEvent, extractKeyFromEvent } from '../../utils/common';

const { Redirect } = Routing;

export class AccountLogin extends Component {
  state = {
    email: '',
    password: '',
    error: '',
  }

  onEmailChange = (event) => {
    this.setState({ email: extractValueFromEvent(event) });
  }
  onPassChange = (event) => {
    this.setState({ password: extractValueFromEvent(event) });
  }

  submit = () => {
    const { dispatchLogin } = this.props;
    const { email } = this.state;

    this.setState({ error: '' });
    dispatchLogin({ email });
  }

  handleKeyDown = (event) => {
    if (extractKeyFromEvent(event) === 'Enter') {
        this.submit();
    }
  }

  render() {
    const { error } = this.state;
    const { isLoggedIn, translations } = this.props;

    if (isLoggedIn) {
      return <Redirect to="/" />;
    }

    const content = (
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
        {!!error && <Text>{error}</Text>}
      </View>
    );

    if (isWeb) {
      return content;
    }
    return (
      <ScrollView>
        {content}
      </ScrollView>
    );
  }
}

export const styles = StyleSheet.create({
  loginForm: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
  },
  button: {
    margin: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#00F',
  },
  label: {
    color: '#000',
    margin: 10,
  },
  textinput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    color: '#000',
    padding: 5,
    margin: 10,
  },
  error: {
    color: '#f00',
    margin: 10,
  },
});

export const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  translations: {
    login__email__label: state.locale.translations.login__email__label,
    login__password__label: state.locale.translations.login__password__label,
    login__email__placeholder: state.locale.translations.login__email__placeholder,
    login__password__placeholder: state.locale.translations.login__password__placeholder,
    login: state.locale.translations.login,
  }
});

export const mapDispatchToProps = dispatch => ({
  dispatchLogin: user => dispatch(loginAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountLogin);
