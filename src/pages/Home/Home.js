import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Image } from 'react-native';
import { logout as logoutAction } from '../../actions/auth';
import Button from '../../components/Button';

const logo = require('../../assets/logo.svg');

export class Home extends Component {
  logout = () => {
    const { logout } = this.props;
    logout();
  }

  render() {
    const { translations, qrCode } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.biggerText}>{translations.home__welcome}</Text>
          {qrCode && <Text style={styles.biggerText}>{`${translations.home__your_qr_code}${qrCode}`}</Text>}
          <Image
            source={logo}
            style={styles.image}
          />
          <View style={styles.row}>
            <Button style={styles.button} text={translations.logout} onClick={this.logout} textStyle={styles.buttonText} />
          </View>
          <Text style={styles.text}>
            {translations.home__loggedin}
          </Text>
        </View>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  biggerText: {
    fontSize: 17,
    alignSelf: 'center'
  },
  button: {
    margin: 5
  },
  buttonText: {
    color: '#00F',
  },
  image: {
    width: 250,
    height: 76
  }
});

export const mapStateToProps = state => ({
  qrCode: state.qr.data,
  translations: {
    home__loggedin: state.locale.translations.home__loggedin,
    home__welcome: state.locale.translations.home__welcome,
    home__your_qr_code: state.locale.translations.home__your_qr_code,
    logout: state.locale.translations.logout,
  }
});

export const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
