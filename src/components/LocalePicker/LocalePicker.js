import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { string, func } from 'prop-types';
import { localeOptions } from '../../utils/locales/index';
import { setLocale as setLocaleAction } from '../../actions/locale';
import Picker from '../Picker';
import Button from '../Button';

export class LocalePicker extends Component {
  state = {
    isOpen: false,
  }
  onLocaleChange = locale => {
    this.setState({ isOpen: false });
    this.props.setLocale(locale);
  }
  openPicker = () => this.setState({ isOpen: true });

  render() {
    const { currentLocale } = this.props;
    const { isOpen } = this.state;
    if (!isOpen && Platform.OS === 'ios') {
      return (
        <Button
          style={styles.button}
          onClick={this.openPicker}
          text={currentLocale}
        />
    );
    }
    return (
      <Picker
        style={styles.picker}
        currentValue={currentLocale}
        options={localeOptions}
        onChange={this.onLocaleChange}
      />
    );
  }
}

LocalePicker.propTypes = {
  currentLocale: string,
  setLocale: func,
};

export const styles = StyleSheet.create({
  picker: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
    top: Platform.select({
      web: 10,
      ios: -90,
      android: -20,
    }),
    left: 0,
  },
  button: {
    margin: 2,
    marginTop: Platform.OS === 'ios' ? 40 : 2,
    justifyContent: 'flex-end',
    height: 10,
  },
});

export const mapStateToProps = state => ({
  currentLocale: state.locale.currentLocale,
});
export const mapDispatchToProps = dispatch => ({
  setLocale: locale => dispatch(setLocaleAction(locale)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocalePicker);
