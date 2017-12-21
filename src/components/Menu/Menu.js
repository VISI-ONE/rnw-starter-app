import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import Link from '../Link';
import LocalePicker from '../LocalePicker';

export const routes = [
  {
    to: '/',
    label: 'Home'
  },
  {
    to: '/About',
    label: 'About'
  },
  {
    to: '/Contact',
    label: 'Contact'
  }
];

export const Menu = ({ isLoggedIn }) => isLoggedIn && (
  <View style={styles.container}>
    {routes.map(route => (
      <Link to={route.to} textStyle={styles.linkText} key={`menuLink_${route.label}`} style={styles.link}>
        {route.label}
      </Link>
    ))}
    <LocalePicker />
  </View>
);

export const styles = StyleSheet.create({
  container: {
    height: 70,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  link: {
    margin: 2,
    marginTop: 10,
    height: 20,
  },
  linkText: {
    color: '#04f',
    fontSize: 16,
  }
});

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});
export default connect(mapStateToProps)(Menu);
