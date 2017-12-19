import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export class NotFound extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>404 Page Not Found</Text>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

export default NotFound;
