import React from 'react';
import { connect } from 'react-redux';
import Link from '../Link';
import styles from './styles';
import { isWeb } from '../../utils/common';

export const QrButton = ({ isLoggedIn, isQrScreenVisible }) => {
  if (isWeb || !isLoggedIn || isQrScreenVisible) {
    return null;
  }
  return (
    <Link style={styles.link} textStyle={styles.text} to="/qr-reader">QR reader</Link>
  );
};

export const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  isQrScreenVisible: state.qr.isVisible,
});

export default connect(mapStateToProps)(QrButton);
