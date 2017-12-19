import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('rnwStarterApp', () => App);
AppRegistry.runApplication('rnwStarterApp', {
	initialProps: {},
	rootTag: document.getElementById('root'),
});
