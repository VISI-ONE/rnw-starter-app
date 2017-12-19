import { Platform, StyleSheet, Dimensions, } from 'react-native';

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  link: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: '#000',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    top: Platform.select({
      ios: height - 40,
      android: height - 60,
    }),
    left: 0,
    height: 40,
  },
  text: {
    color: '#FFF',
  },
});

export default styles;
