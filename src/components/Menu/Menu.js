import React from 'react';
import { View, StyleSheet } from 'react-native';
import Link from '../Link';
import LocalePicker from '../LocalePicker';

export const routes = [
  {
    to: '/',
    label: 'Home'
  },
  {
    to: '/404',
    label: '404'
  }
];

export const Menu = () => (
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
    height: 90,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    marginTop: 20
  },
  link: {
    margin: 2,
    marginTop: 10,
  },
  linkText: {
    color: '#04f',
    fontSize: 16,
  }
});

export default Menu;
