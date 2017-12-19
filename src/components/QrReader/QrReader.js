/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Platform } from 'react-native';
import { qrVisible, qrHidden, qrReceived } from '../../actions/qr';
import { isWeb, isIos } from '../../utils/common';
import Routing from '../../utils/routing';
import Reader from './Reader';
import Button from '../Button';
const { Redirect } = Routing;


export class QrReader extends Component {
  state = {
    value: '',
    isTorchOn: false,
  }
  componentDidMount() {
    this.props.qrVisible();
  }

  componentWillUnmount() {
    this.props.qrHidden();
  }

  onBarCodeRead = (e) => {
    this.props.qrReceived(e.data);
    this.setState({ value: e.data });
  }

  toggleTorch = () => this.setState({ isTorchOn: !this.state.isTorchOn })

  renderContent = () => {
    const { translations, history } = this.props;
    return (
      <View style={styles.options}>
        <Button textStyle={styles.button} onClick={this.toggleTorch} text={translations.flash} />
        <Button textStyle={styles.button} onClick={() => history.goBack()} text={translations.back} />
      </View>
    );
  }

  getReader = (options) => {
    const { isTorchOn } = this.state;
    const readerProps = {
      isTorchOn,
      styles: styles.preview,
      onBarCodeRead: this.onBarCodeRead,
    };

    return isIos ? (
      <Reader {...readerProps}>
        {options}
      </Reader>
    ) : (
      <Reader {...readerProps} />
    );
  }

  render() {
    const { isLoggedIn } = this.props;
    const { value } = this.state;

    if (isWeb || !isLoggedIn) {
      return null;
    }
    if (value) {
      return <Redirect to="/" />;
    }
    const options = this.renderContent();

    const reader = this.getReader(options);

    return (
      <View style={styles.container}>
        {reader}
        {!isIos && options}
      </View>
    );
  }
}


export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    flexDirection: Platform.select({
      ios: 'row',
      android: 'column',
    }),
  },
  preview: {
    flex: Platform.select({
      ios: 1,
      android: 5,
    }),
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  options: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        flex: 0,
      },
      android: {
        flex: 1,
        backgroundColor: '#000',
      },
    }),
  },
  button: {
    flex: 0,
    backgroundColor: '#000',
    borderRadius: 5,
    color: '#fff',
    padding: 10,
    margin: 40
  }
});

export const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  translations: {
    flash: state.locale.translations.flash,
    back: state.locale.translations.back,
    instructions: state.locale.translations.qr_code_instructions,
  },
});

export const mapDispatchToProps = dispatch => ({
  qrVisible: () => dispatch(qrVisible()),
  qrHidden: () => dispatch(qrHidden()),
  qrReceived: (data) => dispatch(qrReceived(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QrReader);
